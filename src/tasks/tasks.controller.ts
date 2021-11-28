import { Controller, Get, Post, Body, Param, Delete, Redirect, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
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

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string, 
    // this got a little confusing, why is it from the Body?
    //NOTE:  can't use DTO because we're grabbing dif params
    @Body('status') status: TaskStatus
    ): Task {
    return this.tasksService.updateTask(id, status); 
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
