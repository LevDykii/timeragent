<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Teamwork\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class UserController extends Controller
{
    public function index() {
        return Auth::user();
    }

    public function update(Request $request) {
        $user = User::find($request->user['id']);
        $user->update([
            'name' => $request->user['name'],
            'email' => $request->user['email'],
            'billable_rate' => $request->user['billable_rate'],
            'cost_rate' => $request->user['cost_rate'],
            'billable_currency' => $request->user['billable_currency'],
            'cost_currency' => $request->user['cost_currency'],

        ]);
        return $user;
    }

}
