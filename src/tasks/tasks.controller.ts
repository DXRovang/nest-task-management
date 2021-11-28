import { Controller, Get, Post, Body, Param, Delete, Redirect } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  };

  //3 variations on id
  // '/:id', 'id', id 
  @Get('/:id')
  getOneTask(@Param('id') id: string): Task{
    return this.tasksService.getOneTask(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void{
    this.tasksService.deleteTask(id);
    
  }

  // returns entire request body
  // problem is that there are no strong params
  // @Post()
  // createTask(@Body() body){
  //   console.log('body', body)
  // }

  // returns only allowed params
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Task {
  //   return this.tasksService.createTask(title, description)
  // }


}
