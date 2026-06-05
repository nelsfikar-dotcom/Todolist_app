import { api } from "../api";
import { task_list } from "./type";
import { ApiResponse } from "../type";

export const taskListService = {
    async getTaskList(): Promise<task_list[]> {
        const response = await api.get<ApiResponse<task_list[]>>('/task_list');

        return response.data.data;
    },

    async getTLById(id: number): Promise<task_list> {
        const response = await api.get<ApiResponse<task_list[]>>(`/task_list/${id}`);

        return response.data.data[0];

    },

    async getTaskListByTaskId(tasks_id: number): Promise<task_list[]> {
        const response = await api.get<ApiResponse<task_list[]>>(
            `/task_list/task/${tasks_id}`
        );

        return response.data.data;
    },

    async createTL(taskList: Omit<task_list, 'id' | 'created_at' | 'updated_at'>) {
        const response = await api.post('/task_list', taskList);

        return response.data;

    },

    async updateTL(id: number, taskList: Partial<task_list>) {
        const response = await api.put(`/task_list/${id}`, taskList);

        return response.data;

    },

    async deleteTL(id: number) {
        const response = await api.delete(`/task_list/${id}`);

        return response.data;

    }
}