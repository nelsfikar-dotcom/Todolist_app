export interface task_list {
    id: number,
    name: string,
    desk: string,
    image: string,
    status: string,
    deadline: string,
    level: string,
    tasks_id: number,
    created_at: string,
    updated_at: string,
}

export type RootStackParamList = {
    Task: undefined;

    detail: {
        task: task_list;
    };

    addDetail: undefined;
};