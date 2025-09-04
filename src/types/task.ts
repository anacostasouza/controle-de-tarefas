import type { FieldValue, Timestamp } from "firebase/firestore";

export type TaskStatus = "pending" | "completed" | "deleted";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  createdAt: Timestamp;
  completedAt?: Timestamp | FieldValue;
  deletedAt: Timestamp;
}
