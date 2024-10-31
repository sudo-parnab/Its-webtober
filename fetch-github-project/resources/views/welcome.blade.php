<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>My Personal Website</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">

    <style>
        body {
            background-color: #121212;
            color: #fff;
        }
        .navbar {
            background-color: #000;
        }
        .intro {
            text-align: center;
            padding: 50px 0;
            background-color: #1e1e1e;
        }
        .project-card {
            background-color: #1e1e1e;
            border: 1px solid #00ff00;
            transition: transform 0.2s;
        }
        .project-card:hover {
            transform: scale(1.05);
        }
        .project-heading {
            text-align: center;
            margin: 30px 0;
        }

        .social-links a {
            margin: 0 15px;
            color: #00ff00;
        }
        a {
            text-decoration: none;
        }
        .lime-color{
            color: #00ff00;
        }
        .min-height{
            min-height: 15rem;
        }
        footer {
            background-color: #000;
            color: #fff;
            text-align: center;
            padding: 40px 0;
            position: relative;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container">
            <div class="d-flex justify-content-between" style="width: 100%;">
                <span class="navbar-brand" style="width: 30%;">Aqib.Ali</span>
                <div class="d-flex justify-content-center" style="width: 70%;">
                    <div class="social-links">
                        <a href="https://github.com/AqibAliMughal" target="_blank">GitHub</a>
                        <a href="https://www.linkedin.com/in/aqibalimughal/" target="_blank">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Intro Section -->
    <section id="intro" class="intro">
        <div class="container">
            <h1>Welcome to <span class="lime-color">Code</span> & Create</h1>
            <p>I'm a backend developer.</p>
        </div>
        <form action="{{route('save.username')}}" method="POST">
            @csrf
            <input type="text" name="username" id="username" style="border-radius: 8px; border:none" placeholder="Github Username">
            <input type="submit" value="Save" class="margin:2px 10px">
        </form>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-5" style="min-height: 60vh">
        <div class="container">
            <div id="heading-section" class="d-flex" style="justify-content: center;">
                <h2 class="project-heading">My Projects</h2>
                <button class="btn btn-link" onclick="refreshData()">
                    <i class="bi bi-arrow-clockwise" style="font-size: 33px;"></i>
                </button>
            </div>
            <div class="row" id="project-section">
                @if( count($projects))
                    @foreach ($projects as $project)
                        <div class="col-md-4">
                            <div class="card project-card mb-4">
                                <div class="card-body min-height">
                                    <h5 class="card-title bg-secondary rounded-3 p-1">{{$project['project_name']}}</h5>
                                    <textarea class="form-control bg-dark text-light border project-card my-3" readonly id="projectDescription" cols="30" rows="3" style="resize: none;">{{$project['project_description']}}</textarea>
                                    <div class="d-flex" style="justify-content: space-between;">
                                        <a href="{{$project['project_url']}}" class="btn btn-outline-light">Project Link</a>
                                        <span class="lime-color">{{$project['created_on']}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    Please register your username first.
                @endif

            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div>
            <span>Aqib.Ali</span>
            <div class="social-links">
                <a href="https://github.com/AqibAliMughal" target="_blank">GitHub</a>
                <a href="https://www.linkedin.com/in/aqibalimughal/" target="_blank">LinkedIn</a>
            </div>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl5/6y1d5K5m5l5wJb2jtG6h5t+dU0V3m2V2FZQ0d" crossorigin="anonymous"></script>
    <script>
        function refreshData() {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            fetch('/fetch-projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({}) // In case wants to send data to the method.
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Assuming the response is JSON
            })
            .then(response => {
                const projectsContainer = document.getElementById('project-section');
                if(response.status == 404){
                    alert(response.message);
                }else{
                    projectsContainer.innerHTML = '';
                    var data = response.data;
                    data.forEach(function(project, index){
                        console.log(index);
                        projectsContainer.insertAdjacentHTML('beforeend',`<div class="col-md-4">
                            <div class="card project-card mb-4">
                            <div class="card-body min-height">
                                <h5 class="card-title bg-secondary rounded-3 p-1">${project.project_name}</h5>
                                <textarea class="form-control bg-dark text-light border project-card my-3" readonly id="projectDescription" cols="30" rows="3" style="resize: none;">${project.project_description}</textarea>
                                <div class="d-flex" style="justify-content: space-between;">
                                    <a href="${project.project_url}" class="btn btn-outline-light">Project Link</a>
                                    <span class="lime-color">${project.created_on}</span>
                                </div>
                            </div>
                            </div>
                        </div>`)
                        })
                }
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
            });
        }
    </script>
    
</body>
</html>
