<?php

namespace App\Http\Controllers;

use App\TimeEntry;
use Illuminate\Http\Request;
use \App\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function getTasks(Request $request) {
//		$tasks = Task::whereDate('created_at', $request->date)->where('user_id', $user_id)->get();
//		$tasks->load('duration');
////		dd($tasks);
//	    return $tasks;

        $user_id = Auth::user()->id;


        return Task::where('user_id', Auth::id())
            ->whereHas('timeEntries', function($sql) use($request) {
                $sql->whereDate('startTime', $request->date);
            })
            ->with(['timeEntries' => function($query) use($request) {
                $query->whereDate('startTime', $request->date)->orderBy('startTime');
            }])
            ->get()
            ->sortBy(function (Task $task) {
                return $task
                    ->timeEntries
                    ->sortBy('startTime')
                    ->last()
                    ->startTime;
            })
            ->values()
            ->toArray();
//            ->map(function (TasksDuration $duration) {
//                return array_merge(
//                    $duration->toArray(),
//                    [
//                        'description' => $duration->task->description,
//                        'project_id'  => $duration->task->project_id,
//                    ]
//                );
//            });

    }

    public function createTask(Request $request) {
        $task = $request->task;
        $task_data = [
            'description' => $task['description'],
            'user_id' => Auth::user()->id,
            'project_id' => $task['project_id'],
        ];
        $created_task = Task::create($task_data);

        $time_entry = [
            'active' => $task['active'],
            'task_id' => $created_task->id,
            'startTime' => $task['startTime'],
            'spendTime' => $task['spendTime'],
            'endTime' => $task['endTime'],
        ];

        $time_entry = TimeEntry::create($time_entry);


//        return response(array_merge(
//            $task_duration->toArray(),
//            [
//                'description' => $task['description'],
//                'project_id'  => $task['project_id'],
//            ]
//        ));
        return response($created_task->load('timeEntries'));
    }

    public function updateTask(Request $request, Task $task) {

        $task_data = [];
    	$task_data['description'] = $request->task['description'];
        if (isset($request->task['project_id'])) {
            $task_data['project_id'] = $request->task['project_id'];
        }
        $task->update($task_data);


    	return response($task);
    }

    public function deleteTask(Task $task) {
        if ($task->timeEntries->count() > 0) {
            foreach ($task->timeEntries as $timeEntry) {
                TimeEntry::find($timeEntry->id)->delete();
            }
        }
        $task->delete();
    }
}