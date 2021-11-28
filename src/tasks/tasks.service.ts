import { Injectable, Redirect } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto} from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  
  getAllTasks(): Task[]{
    return this.tasks
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[]{
    // destructturing, remind yourself
    const { status, search } = filterDto;
    // define temp arr to hold result
    let tasks = this.getAllTasks();
    // do something w status, search
    if (status){
      tasks = tasks.filter(task => task.status = status)
    }
    if (search){
      tasks = tasks.filter(task => {
        if (task.title.includes(search) || task.description.includes(search)){
          return true;
        }
          return false;  
    });
    // return
    return tasks;
  }}

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
