import { Get, Post, Body, Put, Delete, Param, Controller, UseGuards, HttpException, HttpStatus }
  from '@nestjs/common';
import { UserService } from '../shared/services/user.service';
import { CreateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../shared/interfaces/user.interface';
import { Client } from '../shared/interfaces/client.interface';
import { ClientService } from '../shared/services/client.service';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiUseTags('user')
@Controller('users')
export class UserController {

  /**
   * @param userService
   * @param clientsService
   */
  constructor(private readonly userService: UserService,
              private readonly clientsService: ClientService) {
  }

  /**
   * List user
   */
  @ApiOperation({ title: 'Get user' })
  @ApiResponse({ status: 200, description: 'Return user.' })
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  /**
   * User by Id
   * @param id
   */
  @ApiOperation({ title: 'Get user by Id' })
  @ApiResponse({ status: 200, description: 'Return user by Id.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  /**
   * Update user by Id
   * @param id
   * @param cardData
   */
  @ApiOperation({ title: 'Update user by Id' })
  @ApiResponse({ status: 201, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() cardData: CreateUserDto): Promise<User> {
    return this.userService.update(id, cardData);
  }

  /**
   * Delete user by Id
   * @param id
   */
  @ApiOperation({ title: 'Delete user by Id' })
  @ApiResponse({ status: 201, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  /**
   * Create user
   * @param cardData
   */
  @ApiOperation({ title: 'Create user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() cardData: CreateUserDto): Promise<User> {
    return this.userService.create(cardData);
  }

  /**
   * Associate client at a user
   * @param idClient
   * @param idUser
   */
  @ApiOperation({ title: 'Associate client at user' })
  @ApiResponse({ status: 201, description: 'The associate client has been successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Put(':idClient/user/:idUser')
  async createClient(@Param('idClient') idClient: string,
                     @Param('idUser') idUser: string): Promise<User> {
    const client: Client = await this.clientsService.findOne(idClient);
    const user: User = await this.userService.findOne(idUser);

    const tab = [];
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < user.clients.length; i++) {
      tab.push(user.clients[i]._id.toString());
    }

    const result = tab.filter(user => user === client._id.toString());

    if (!result.length) {
      user.clients.push(client);
      await user.save();
      return user;
    }
    throw new HttpException('Not found', HttpStatus.BAD_REQUEST);
  }

}
