export interface task {
    id: number,
    name: string,
    desk: string,
    deadline: string,
    status: string //'completed', 'process', 'cancel',
    level: string,
    user_id: number,
    created_at: string,
    updated_at: string,
}

export interface createTask {
    name: string,
    desk: string,
    deadline: string,
    status: string //'completed', 'process', 'cancel',
    level: string,
    user_id: string,
}

export interface updateTask {
    id: number,
    name: string,
    desk: string,
    deadline: string,
    status: string //'completed', 'process', 'cancel',
    level: string,
    user_id: number,
}