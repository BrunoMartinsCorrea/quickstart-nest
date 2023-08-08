import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../../domain/service/user.service';
import { ApiConflictResponse, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../../../common/dto/error-response.dto';
import { User } from '../../domain/model/user';
import { UserDto } from '../dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConflictResponse({ type: ErrorResponseDto })
  async create(@Body() createUserDto: CreateUserDto, @Res() response: ExpressResponse) {
    let createdUser = await this.userService.create({
      username: createUserDto.username,
      password: createUserDto.password,
      fullName: createUserDto.fullName,
      email: createUserDto.email,
    } as User);

    return response.setHeader('Location', `${response.req.url}/${createdUser.id}`).send();
  }

  @Get(':id')
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    let foundUser = await this.userService.findOne(id);
    return { ...foundUser } as UserDto;
  }

  @Put(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let updatedUser = await this.userService.update({ id, ...updateUserDto } as User);
    return { ...updatedUser } as UserDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async softDelete(@Param('id') id: string) {
    return await this.userService.softDelete(id);
  }
}
