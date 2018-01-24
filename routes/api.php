<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', 'UserController@index');

Route::middleware('auth:api')->post('/user', 'UserController@update');

Route::middleware('auth:api')->get('/tasks', 'TaskController@getTasks');

Route::middleware('auth:api')->post('/update-task/{task}', 'TaskController@updateTask');

Route::middleware('auth:api')->post('/create-task', 'TaskController@createTask');


Route::middleware('auth:api')->post('/continue-task/{timeEntry}', 'TimeEntryController@continueTask');

Route::middleware('auth:api')->post('/stop-task/{timeEntry}', 'TimeEntryController@stopTask');

Route::middleware('auth:api')->post('/delete-task/{task}', 'TaskController@deleteTask');

Route::middleware('auth:api')->post('/create-time-entry', 'TimeEntryController@createTimeEntry');
Route::middleware('auth:api')->post('/update-time-entry/{timeEntry}', 'TimeEntryController@updateTimeEntry');
Route::middleware('auth:api')->post('/delete-time-entry/{timeEntry}', 'TimeEntryController@deleteTimeEntry');

Route::middleware('auth:api')->get('/teams', 'TeamController@getTeams');
Route::middleware('auth:api')->post('/teams/new', 'TeamController@create');
Route::middleware('auth:api')->post('/teams/invite', 'TeamController@invite');
Route::middleware('auth:api')->get('/teams/exists-members', 'TeamController@getExistsMembers');
Route::middleware('auth:api')->post('/teams/{team}/delete', 'TeamController@delete');
Route::middleware('auth:api')->get('/teams/{team}', 'TeamController@edit')->middleware('can:update,team');
Route::middleware('auth:api')->post('/teams/{team}', 'TeamController@update');

Route::middleware('auth:api')->get('/projects', 'ProjectController@getProjects');
Route::middleware('auth:api')->post('/projects/new', 'ProjectController@createProject');
Route::middleware('auth:api')->get('/projects/teams', 'TeamController@getOwnTeams');
Route::middleware('auth:api')->get('/projects/users', 'TeamController@getOwnUsers');
Route::middleware('auth:api')->get('/projects/{project}', 'ProjectController@edit')->middleware('can:update,project');
Route::middleware('auth:api')->post('/projects/{project}', 'ProjectController@update');
Route::middleware('auth:api')->post('/projects/{project}/delete', 'ProjectController@delete');