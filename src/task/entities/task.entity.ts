import { Exclude, Expose } from 'class-transformer';

export class TaskDto {
  @Exclude()
  id: number;
  @Expose()
  taskName: string;
  @Exclude()
  taskCreatedAt: Date;
  @Expose()
  author: string;
  @Exclude()
  doDateTask: Date;
  @Exclude()
  updateTaskTime: Date;
  @Exclude()
  deleteTaskTime: Date;
  @Expose()
  taskDescription: string;
  @Exclude()
  deleteFlag: boolean;
  constructor(partial: Partial<TaskDto>) {
    Object.assign(this, partial);
  }
}
