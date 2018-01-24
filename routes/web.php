<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (!auth()->check() && !app()->environment() === 'local') {
        return redirect()->to(config('app.promo_url'));
    }
    return view('welcome');
});

Auth::routes();

// Route::domain('app.time-tracker-laravel.dev')->group(function() {
        // Route::get('/', 'HomeController@index')->name('home');
// });

Route::get('/', 'HomeController@index')->name('home');

Route::get('/redirect', function() {
    // Build the query parameter string to pass auth information to our request
    $query = http_build_query([
        'client_id' => 3,
        // 'redirect_uri' => 'http://time-tracker-laravel.dev/callback',
        'redirect_uri' => 'http://localhost:8080/#/tracker',
        'response_type' => 'code',
        'scope' => ''
    ]);

    // Redirect the user to the OAuth authorization page
    return redirect('http://time-tracker-laravel.dev/oauth/authorize?' . $query);
});

Route::get('/callback', function() {
	$http = new GuzzleHttp/Client;

	$response = $http->post('time-tracker-laravel/oauth/token', [
		'form_params' => [
			'grant_type' => 'authorization_code',
			'client_id' => 3,
			'client_secret' => 'jAnXxvF96Gw5iPW5vmWlcjZ8L098B4t57fakMRTx',
			'redirect_uri' => 'http://time-tracker-laravel.dev/callback',
			'code' => $request->code,
		],
	]);

	return json_decode((string) $response->getBody(), true);
});




/**
 * Teamwork routes
 */
Route::group(['prefix' => 'teams', 'namespace' => 'Teamwork'], function()
{
    Route::get('/', 'TeamController@index')->name('teams.index');
    Route::get('create', 'TeamController@create')->name('teams.create');
    Route::post('teams', 'TeamController@store')->name('teams.store');
    Route::get('edit/{id}', 'TeamController@edit')->name('teams.edit');
    Route::put('edit/{id}', 'TeamController@update')->name('teams.update');
    Route::delete('destroy/{id}', 'TeamController@destroy')->name('teams.destroy');
    Route::get('switch/{id}', 'TeamController@switchTeam')->name('teams.switch');

    Route::get('members/{id}', 'TeamMemberController@show')->name('teams.members.show');
    Route::get('members/resend/{invite_id}', 'TeamMemberController@resendInvite')->name('teams.members.resend_invite');
    Route::post('members/{id}', 'TeamMemberController@invite')->name('teams.members.invite');
    Route::delete('members/{id}/{user_id}', 'TeamMemberController@destroy')->name('teams.members.destroy');

    Route::get('accept/{token}', 'AuthController@acceptInvite')->name('teams.accept_invite')->middleware('auth');
});
