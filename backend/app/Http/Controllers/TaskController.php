<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Static storage for assignment constraints (resets per server cycle in traditional PHP config, 
    // although PHP's execution model per-request actually resets statics. Since this represents 
    // a mock database for the exercise, we implement it as intended in the PRD).
    private static $tasks = [
        ['id' => 1, 'title' => 'Learn Laravel', 'completed' => true, 'createdAt' => '2023-10-01T12:00:00Z'],
        ['id' => 2, 'title' => 'Build Task Manager', 'completed' => false, 'createdAt' => '2023-10-02T12:00:00Z']
    ];
    private static $nextId = 3;

    public function index()
    {
        return response()->json(self::$tasks, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $task = [
            'id' => self::$nextId++,
            'title' => trim($validated['title']),
            'completed' => false,
            'createdAt' => now()->toIso8601String()
        ];

        self::$tasks[] = $task;

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'completed' => 'required|boolean'
        ]);

        foreach (self::$tasks as &$task) {
            if ($task['id'] == $id) {
                $task['completed'] = $validated['completed'];
                return response()->json($task, 200);
            }
        }

        return response()->json(['error' => 'Task not found'], 404);
    }

    public function destroy($id)
    {
        foreach (self::$tasks as $key => $task) {
            if ($task['id'] == $id) {
                array_splice(self::$tasks, $key, 1);
                return response()->json(['message' => 'Deleted'], 200);
            }
        }

        return response()->json(['error' => 'Task not found'], 404);
    }
}
