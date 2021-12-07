import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    //uses Querybuilder from tyepORM
    const query= this.createQueryBuilder('task');
    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>{
    const { title, description } = createTaskDto;
    // NOTE:  create needs 2 methods from tasksRepo
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    await this.save(task);
    return task;
  }

  async deleteTask(Task): Promise<Task>{
    await this.delete(Task);
    return Task;
  }

}