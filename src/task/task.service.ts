import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({
      data: {
        taskName: createTaskDto.taskName,
        author: createTaskDto.author,
        doDateTask: createTaskDto.doDateTask,
        taskDescription: createTaskDto.taskDescription,
      },
    });
  }

  findAll() {
    return this.prismaService.task.findMany();
  }

  findOne(id: number) {
    return this.prismaService.task.findUnique({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data: {
        doDateTask: updateTaskDto.doDateTask,
        taskDescription: updateTaskDto.taskDescription,
        taskName: updateTaskDto.taskName,
        updateTaskTime: updateTaskDto.updateTaskTime,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.task.update({
      where: { id },
      data: { deleteFlag: true },
    });
    return {
      message: 'success',
    };
  }
}
