import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ApiConflictResponse, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserService } from '@/user/domain/service/user.service';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { User } from '@/user/domain/model/user';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '@/user/http-server/dto/user.dto';
import { CreateUserDto } from '@/user/http-server/dto/create-user.dto';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConflictResponse({ type: ErrorResponseDto })
  async create(@Body() createUserDto: CreateUserDto, @Res() response: ExpressResponse) {
    const createdUser = await this.userService.create({
      username: createUserDto.username,
      password: createUserDto.password,
      fullName: createUserDto.fullName,
      email: createUserDto.email,
    } as User);

    return response.setHeader('Location', `${response.req.url}/${createdUser.id}`).send();
  }

  @Get()
  async listAll(@Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number) {
    console.log({ page, limit });

    const [results, totalCount] = await this.userService.listAll({
      limit,
      page,
    });

    return {
      results,
      totalCount,
      page,
      limit,
    } as PaginatedResponseDto<User>;
  }

  @Get(':id')
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const foundUser = await this.userService.findOne(id);
    return { ...foundUser } as UserDto;
  }

  @Put(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update({ id, ...updateUserDto } as User);
    return { ...updatedUser } as UserDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async softDelete(@Param('id') id: string) {
    return this.userService.softDelete(id);
  }
}
