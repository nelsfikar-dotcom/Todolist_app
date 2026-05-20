import { create } from "node:domain";
import { api } from "../api";

import { task_list, createTaskList, updateTaskList } from "./type";

export const taskListService = {
    async getTaskList() : Promise <task_list[]> {
        const response = await api.get<task_list[]> ('/task_list')
        return response.data
    },

    async getTLById(id : number) : Promise <task_list> {
        const response = await api.get<task_list> ('/task_list/id')
        return response.data
    },

    async createTL(data : createTaskList) : Promise <createTaskList> {
        const response = await api.post<createTaskList> ('/task_list', data)
        return response.data
    },

    async updateTL(data : updateTaskList) : Promise <updateTaskList> {
        const response = await api.put<updateTaskList> ('/task_list', data)
        return response.data
    },

    async deleteTL(id : number) : Promise <void> {
        const response = await api.delete ('/task_list/id')
        return response.data
    }
}