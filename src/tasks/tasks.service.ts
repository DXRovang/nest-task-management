import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [1,2,3];
  
  getAllTasks(){
    return this.tasks
  }
  getOneTask(){
    return this.tasks[0]
  }
}
