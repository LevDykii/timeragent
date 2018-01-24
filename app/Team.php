<?php

namespace App;

use Illuminate\Support\Facades\Auth;
use Mpociot\Teamwork\TeamworkTeam;

class Team extends TeamworkTeam
{
	public function projects() {
		return $this->belongsToMany('App\Project', 'projects_teams', 'team_id', 'project_id');
	}

	public function scopeIManage($query, $user_id = null)
    {
        return $query->where('owner_id', $user_id ?: Auth::id());
    }
}
