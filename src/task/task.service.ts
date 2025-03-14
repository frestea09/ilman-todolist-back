import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskDto } from './entities/task.entity';
import { plainToInstance } from 'class-transformer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from '@nestjs/cache-manager';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
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

  async findAll() {
    const cacheKey = 'task_list';
    const cachedTask = await this.cacheManager.get(cacheKey);
    if (cachedTask) {
      console.log('Data dari cache:', cachedTask);
      return plainToInstance(TaskDto, cachedTask, {
        excludeExtraneousValues: true,
      });
    }
    const results = await this.prismaService.task.findMany();
    await this.cacheManager.set(cacheKey, results); // Cache akan bertahan 60 detik
    console.log('Data dari database:', results);
    return plainToInstance(TaskDto, results, { excludeExtraneousValues: true });
  }

  async findOne(id: number) {
    const result = await this.prismaService.task.findUnique({ where: { id } });
    return plainToInstance(TaskDto, result, { excludeExtraneousValues: true });
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
