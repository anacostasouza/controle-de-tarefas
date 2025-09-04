/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Task {
    id: string;
    title: string;
    status: 'pending' | 'completed' | 'deleted';
    userId: string;
    createdAt: any; // Use appropriate type for timestamp
    completedAt?: any; // Optional, use appropriate type for timestamp
    deletedAt?: any; // Optional, use appropriate type for timestamp
}