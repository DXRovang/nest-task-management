import { Injectable, Redirect } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto} from './dto/create-task.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  
  getAllTasks(): Task[]{
    return this.tasks
  }
  //not entirely sure how getOneTask has a type of Task
  getOneTask(id: string): Task{
    return this.tasks.find(x=>x.id === id)
  }

  deleteTask(id: string): void{
    this.tasks = this.tasks.filter(x=>x.id !== id);   
  }

  updateTask(id: string, status: TaskStatus): Task{
    //update the task
    const task = this.getOneTask(id);
    task.status = status;
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task{
    const {title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      }
      this.tasks.push(task)
      return task;
    };


}
