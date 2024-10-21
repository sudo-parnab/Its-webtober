# GitHub Projects Viewer

## Overview

This project is a personal application that displays a user's GitHub projects in a visually appealing format. It fetches the user's repositories from GitHub and presents essential details about each project, including the project name, creation date, description, and a link to the GitHub repository.

## Features

- **Project Section**: Showcases all GitHub projects of the user.
  - **Project Name**: The name of each project.
  - **Created On**: The date when the project was created.
  - **Description**: A brief description of the project.
  - **GitHub URL**: A link to the project's repository on GitHub.

- **Refresh Button**: Allows users to check for any recently added projects. When clicked, it checks the user's GitHub account for any new repositories and updates the view accordingly.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Laravel
- **Database**: MySQL
- **API**: GitHub API for fetching project details

## Installation

1. Clone the repository:
2. Navigate to the project directory: cd repo-name
3. Install dependencies: composer install

## Project Setup
1. Set up your environment file: cp .env.example .env
2. Generate an application key: [php artisan key:generate]
3. Configure your database settings in the .env file.
4. Run migrations: [php artisan migrate]
5. Serve the application: [php artisan serve]
6. Last, Access the application at http://localhost:8000.



