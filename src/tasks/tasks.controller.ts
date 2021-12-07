import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto)
  }

  //3 variations on id
  // '/:id', 'id', id
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    // destructuring
    return this.tasksService.updateTask(id, status);
  }

}

// @Get()
// getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
//   //if we have any filters defined, call tasksService.getTasksWithFilter
//   //NOTE:  look up Object.keys
//   if (Object.keys(filterDto).length) {
//     return this.tasksService.getTaskWithFilters(filterDto);
//   } else {
//     //otherwise get all tasks
//     return this.tasksService.getAllTasks();
//   }
// }

  // // @Patch('/:id/status')
  // // updateTask(
  // //   @Param('id') id: string,
  // //   // this got a little confusing, why is it from the Body?
  // //   //NOTE:  can't use DTO because we're grabbing dif params
  // //   @Body('status') status: TaskStatus
  // //   ): Task {
  // //   return this.tasksService.updateTask(id, status);
  // // }

  // // returns entire request body
  // // problem is that there are no strong params
  // // @Post()
  // // createTask(@Body() body){
  // //   console.log('body', body)
  // // }

  // // returns only allowed params
  // // @Post()
  // // createTask(
  // //   @Body('title') title: string,
  // //   @Body('description') description: string,
  // // ): Task {
  // //   return this.tasksService.createTask(title, description)
  // // }