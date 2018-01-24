<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TimeEntry;
use \App\Task;

class TimeEntryController extends Controller
{
    public function createTimeEntry(Request $request) {
        $task = $request->task;
        $time_entry = [
            'active' => $task['active'],
            'task_id' => $task['task_id'],
            'startTime' => $task['startTime'],
            'spendTime' => $task['spendTime'],
            'endTime' => $task['endTime'],
        ];

        $time_entry = TimeEntry::create($time_entry);

        return response($time_entry);
    }

    public function updateTimeEntry(Request $request, TimeEntry $timeEntry) {

        $all = [
            'startTime' => $request->timeEntry['startTime'],
            'endTime' => $request->timeEntry['endTime'],
        ];

        $timeEntry->update($all);

        return $timeEntry;
    }

    public function deleteTimeEntry(TimeEntry $timeEntry) {
        if ($timeEntry->task->timeEntries->count() <= 1) {
            $task = Task::find($timeEntry->task_id);
            $task->delete();
        }
        $timeEntry->delete();
    }

    public function continueTask(Request $request, TimeEntry $timeEntry) {
//        $task = Task::find($request['task_id']);
        $timeEntry->active = true;
        $timeEntry->endTime = null;

        $timeEntry->save();
        return $timeEntry;
    }

    public function stopTask(Request $request, TimeEntry $timeEntry) {
        $timeEntry->active = false;
        $timeEntry->endTime = $request->endTime;
        $timeEntry->save();
        return $timeEntry;
    }
}
