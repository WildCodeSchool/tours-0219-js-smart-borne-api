import { Get, Post, Body, Put, Delete, Param, Controller, UseGuards }
  from '@nestjs/common';
import { UserService } from '../shared/services/user.service';
import { CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../shared/interfaces/user.interface';
import { Client } from '../shared/interfaces/client.interface';
import { ClientService } from '../shared/services/client.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService,
    private readonly clientsService: ClientService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() cardData: CreateUserDto): Promise<User> {
    return this.userService.update(id, cardData);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Post()
  async create(@Body() cardData: CreateUserDto): Promise<User> {
    return this.userService.create(cardData);
  }

  @Put(':idClient/user/:idUser')
  async createClient(@Param('idClient') idClient: string,
    @Param('idUser') idUser: string): Promise<User> {
    const client: Client = await this.clientsService.findOne(idClient);
    const user: User = await this.userService.findOne(idUser);
    user.clients.push(client);
    await user.save();
    return user;
  }

}
