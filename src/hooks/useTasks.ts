/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { listTasks, addTask, updateTask, markTaskDeleted } from '../api/firestore';
import type { Task } from '../types/task';

export function useTasks(userId: string) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        const data = await listTasks(userId);
        setTasks(data as Task[]);
    }

    const addTaskHandler = async (title: string) => {
        await addTask(title, userId);
        fetchTasks();
    }

    const completeTaskHandler = async (id: string) => {
        await updateTask(id, { status: 'completed', completedAt: new Date() });
        fetchTasks();
    }

    const deleteTaskHandler = async (id: string) => {
        await markTaskDeleted(id);
        fetchTasks();
    }

    useEffect(() => { fetchTasks(); }, [userId]);

    return { tasks, addTask: addTaskHandler, completeTask: completeTaskHandler, deleteTask: deleteTaskHandler };
}