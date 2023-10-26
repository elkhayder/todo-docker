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
    public function index()
    {
        return TodoResource::collection(Todo::all());
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

        return new TodoResource(Todo::create($validated));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new TodoResource(Todo::findOrFail($id));
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

        $todo->update($validated);

        return new TodoResource($todo->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Todo::findOrFail($id)->delete();
    }
}
