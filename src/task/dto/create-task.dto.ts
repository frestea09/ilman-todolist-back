import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  taskName: string;
  taskCreatedAt: Date;
  @IsString()
  author: string;
  doDateTask: Date;
  deleteTaskTime: Date;
  updateTaskTime: Date;
  @IsString()
  taskDescription: string;
  @IsBoolean()
  deleteFlag: boolean;
}
