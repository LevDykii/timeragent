<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
	protected $fillable = ['name', 'owner_id'];

    public function teams() {
    	return $this->belongsToMany('App\Team', 'projects_teams', 'project_id', 'team_id');
    }
    public function attachTeam($team_id)
    {
    	$this->teams()->attach($team_id);
    	return $this;
    }

    public function detachTeam($team_id)
    {
        $this->teams()->detach($team_id);
        return $this;
    }

    public function users() {
    	return $this->belongsToMany('App\User', 'project_user', 'project_id', 'user_id')
    		->withPivot('billable_rate', 'billable_currency', 'cost_rate', 'cost_currency', 'team_id')
    		->withTimestamps();
    }

    public function usersWithTeam($team_id) {
        return $this->belongsToMany('App\User', 'project_user', 'project_id', 'user_id')
            ->wherePivot('team_id', $team_id)
            ->withPivot('billable_rate', 'cost_rate', 'team_id')
            ->withTimestamps();
    }

    public function usersWithoutTeam() {
        return $this->belongsToMany('App\User', 'project_user', 'project_id', 'user_id')
            ->wherePivot('team_id', NULL)
            ->withPivot('billable_rate', 'cost_rate', 'team_id')
            ->withTimestamps();
    }

    public function attachUser($user_id, $pivot = [])
    {
    	$this->users()->attach($user_id, $pivot);
    	return $this;
    }

    public function detachUser($user_id, $team_id)
    {
        $this->users()->wherePivot('team_id', $team_id)->detach($user_id);
        return $this;
    }

    public function tasks() {
        return $this->hasMany('App\Task', 'project_id');
    }
}
