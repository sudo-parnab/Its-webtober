<?php

namespace App\Http\Controllers;

use App\Models\gitHubProjects;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GithubProjectController extends Controller
{
    protected $githubUrl = 'https://api.github.com/users/your-github-userName-here/repos';
    public function index()
    {
        $setting = Setting::firstOrCreate(
            ['key' => 'github_projects_updated'],
            ['value' => false]
        );
        
        // Defauly 1st time data will be fetched and added to the DB.
        // Reason of creating DB is to avoid accessing api again & again.
        if (!$setting->value) {
            $response = Http::get($this->githubUrl);
            $projects = $response->json();    
            foreach ($projects as $project) {
                gitHubProjects::create([
                    'project_name' => $project['name'],
                    'project_url' => $project['html_url'],
                    'project_description' => isset($project['description']) ? $project['description'] : 'No Description Added.',
                    'created_on' => Carbon::parse($project['created_at'])->format('Y-m-d H:i:s'),
                ]);
            }
            $setting->value = true;
            $setting->save();
        }
        
        $projects = gitHubProjects::orderBy('id', 'desc')->get();
        return view('welcome', compact('projects'));
    }
    
    // Function that will be trigger on click of refresh button beside 'Project heading'
    public function fetchProjects(Request $request){
        $response = Http::get($this->githubUrl);
        $response = $response->json();
        $lastProject = $response[array_key_last($response)];
        $isRecentProjectExist = gitHubProjects::where('project_url', $lastProject['html_url'])->first();
        if(!$isRecentProjectExist->project_name){
            gitHubProjects::create([
                'project_name' => $lastProject['name'],
                'project_url' => $lastProject['html_url'],
                'project_description' => isset($lastProject['description']) ? $lastProject['description'] : 'No Description Added.',
                'created_on' => Carbon::parse($lastProject['created_at'])->format('Y-m-d H:i:s'),
            ]);
            $projects = gitHubProjects::orderBy('id', 'desc')->get();
            return response()->json(['message' => 'New Project Added', 'data' => $projects], 200);
        }else{
            return response()->json(['message' => 'No new project added.', 'status' => 404]);
        }
        return $response->json();
    }
}
