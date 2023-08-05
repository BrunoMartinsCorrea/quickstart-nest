import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../../domain/service/user.service';
import { User } from '../../persistence/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: ExpressResponse) {
    let createdUser = await this.userService.create({
      username: createUserDto.username,
      password: createUserDto.password,
      fullName: createUserDto.fullName,
      email: createUserDto.email,
    } as User);

    return response.setHeader('Location', `${response.req.url}/${createdUser.id}`).status(HttpStatus.CREATED).send();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({ id, ...updateUserDto } as User);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string, @Res() response: ExpressResponse) {
    let hasDeleted = await this.userService.softDelete(id);
    return response.status(hasDeleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND).send();
  }
}
