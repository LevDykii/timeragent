<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'description',
        'active',
        'user_id',
        'project_id',
        'created_at',
    ];

    public function project() {
    	return $this->belongsTo('App\Project');
    }

    public function timeEntries() {
        return $this->hasMany('App\TimeEntry');
    }

}
