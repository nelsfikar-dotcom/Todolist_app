import { api } from "../api"
import { ApiResponse } from "../type";
import { Task } from "./type";

export const taskService = {
    async getTask(): Promise<Task[]> {
        const response = await api.get<ApiResponse<Task[]>>('/tasks');

        return response.data.data;
    },

    async getTaskById(id: number): Promise<Task> {
        const response = await api.get<ApiResponse<Task[]>>(`/tasks/${id}`);

        return response.data.data[0];
    },

    async getTaskByUserId(userId: number): Promise<Task[]> {
        const response = await api.get<ApiResponse<Task[]>>(`/tasks/user/${userId}`);

        return response.data.data;
    },

    async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {

        const response = await api.post('/tasks', task);

        return response.data;
    },

    async updateTask(id: number, task: Partial<Task>) {

        const response = await api.put(`/tasks/${id}`, task);

        return response.data;
    },

    async deleteTask(id: number) {

        const response = await api.delete(`/tasks/${id}`);

        return response.data;
    }
}