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
    private tasksRepository: TasksRepository
  ){}
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

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found){
      throw new NotFoundException()
    }
    return found;
  }
  // //not entirely sure how getOneTask has a type of Task
  // getOneTask(id: string): Task {
  //   //try to get task
  //   //if not found, throw 404 error
  //   //otherwise return task
  //   const found = this.tasks.find((x) => x.id === id);

  //   if (!found) {
  //     throw new NotFoundException();
  //   }
  //   return found;
  // }

  // deleteTask(id: string): void {
  //   const found = this.getOneTask(id);
  //   //this will work because getOneTask will throw error
  //   this.tasks = this.tasks.filter((x) => x.id !== id);
  // }

  // updateTask(id: string, status: TaskStatus): Task {
  //   //update the task
  //   const task = this.getOneTask(id);
  //   task.status = status;
  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
