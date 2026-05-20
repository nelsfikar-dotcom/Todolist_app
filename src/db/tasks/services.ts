import  { api } from "../api"

import { task, createTask, updateTask} from "./type"

export const taskService = {
    async getTask() : Promise <task[]> {
        const response = await api.get<task[]> ('/tasks')
        return response.data
    },

    async getTaskById(id : number) : Promise <task> {
        const response = await api.get<task> ('/tasks/id')
        return response.data
    },

    async createTask(data : createTask) : Promise <createTask> {
        const response = await api.post<createTask> ('/tasks',data)
        return response.data
    },

    async updateTask(data : updateTask) : Promise <updateTask> {
        const response = await api.put<updateTask> ('/tasks/id',data)
        return response.data
    },

    async deleteTask(id : number) : Promise <void> {
        const response = await api.delete ('/tasks/id')
        return response.data
    }
}