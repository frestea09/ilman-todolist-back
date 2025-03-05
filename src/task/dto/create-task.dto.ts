export class CreateTaskDto {
  taskName: string;
  taskCreatedAt: Date;
  author: string;
  doDateTask: Date;
  deleteTaskTime: Date;
  updateTaskTime: Date;
  taskDescription: string;
  deleteFlag: boolean;
}
