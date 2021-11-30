import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   // destructturing, remind yourself
  //   const { status, search } = filterDto;
  //   // define temp arr to hold result
  //   let tasks = this.getAllTasks();
  //   // do something w status, search
  //   if (status) {
  //     tasks = tasks.filter((task) => (task.status = status));
  //   }
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //     // return
  //     return tasks;
  //   }
  // }

  //not entirely sure how getTaskById has a Promise type of Task
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    // NOTE:  You can use void in a Promise!
    const taskToDelete = await this.tasksRepository.delete(id)
    // NOTE:  found .affected by console.log
    if (taskToDelete.affected === 0){
      throw new NotFoundException()
    }
 
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

}
