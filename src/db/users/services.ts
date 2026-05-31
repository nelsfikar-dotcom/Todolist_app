import { api } from "../api";
import { user } from "./type";
import { ApiResponse } from "../type";


export const userService = {
    async getUser(): Promise<user[]> {
        const response = await api.get<ApiResponse<user[]>>('/users');
        return response.data.data;
    },
    async getUserByID(id: number): Promise<user> {
        const response = await api.get<ApiResponse<user[]>>(`/users/${id}`);

        return response.data.data[0];

    },

    async createUser(user: Omit<user, 'id' | 'created_at' | 'update_at'>) {

        const response = await api.post('/users', user);

        return response.data;

    },

    async updateUser(id: number, user: Partial<user>) {
        const response = await api.put(`/users/${id}`, user);

        return response.data;
    },

    async deleteUser(id: number) {
        const response = await api.delete(`/users/${id}`);

        return response.data;

    }

}