<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use Illuminate\Http\Request;

use App\Models\Todo;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return TodoResource::collection($request->user()->todos->all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:1',
            'done' => 'nullable|boolean',
        ]);

        return new TodoResource($request->user()->todos()->create($validated));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $todo = Todo::findOrFail($id);

        if($todo->user_id != $request->user()->id) {
            abort(403);
        }

        return new TodoResource($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'done' => 'required|boolean',
        ]);

        $todo = Todo::findOrFail($id);

        if($todo->user_id != $request->user()->id) {
            abort(403);
        }

        $todo->update($validated);

        return new TodoResource($todo->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $todo = Todo::findOrFail($id);

        if($todo->user_id != $request->user()->id) {
            abort(403);
        }

        $todo->delete();
    }
}
