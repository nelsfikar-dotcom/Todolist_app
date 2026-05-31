export interface Task {
    id: number;
    name: string;
    desk: string;
    deadline: string;
    status: 'completed' | 'process' | 'cancel';
    level: 'priority' | 'optional' | 'normal';
    user_id: number;
    created_at: string;
    updated_at: string;
}