<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json([
            'tasks' => $tasks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {


        if($request->user()->id !== Project::find($request->project_id)->created_by){
            return response()->json([
                'message' => 'nao autorizado'
            ], 403);
        }
        $task = Task::create($request->validated());
        return response()->json([
            'task' => $task,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json([
            'task' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if($request->user()->id !== Project::find($request->project_id)->created_by){
            return response()->json([
                'message' => 'nao autorizado'
            ], 403);
        }
        $task->update($request->validated());
        return response()->json([
            'task' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if(auth()->user()->id !== Project::find($task->project_id)->created_by){
            return response()->json([
                'message' => 'nao autorizado'
            ], 403);
        }
        $task->delete();
        return response()->json([
            'task' => $task
        ]);
    }
}
