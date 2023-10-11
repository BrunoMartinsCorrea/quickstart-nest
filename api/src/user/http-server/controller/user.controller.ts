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
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  async create(@Body() createUserDto: CreateUserDto, @Res() response: ExpressResponse) {
    return this.service.create(createUserDto as User).then((it) => {
      return response.setHeader('Location', `${response.req.url}/${it.id}`).send(it as UserDto);
    });
  }

  @Get()
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findAll(@Query() paginatedQueryDto: PaginatedQueryDto) {
    const [results, totalCount] = await this.service.findAll(paginatedQueryDto);

    return {
      results,
      totalCount,
      ...paginatedQueryDto,
    } as PaginatedResponseDto<User>;
  }

  @Get(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const foundUser = await this.service.findOne(id);
    return foundUser as UserDto;
  }

  @Put(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.service.update({ id, ...updateUserDto } as User);
    return updatedUser as UserDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.softDelete(id);
  }
}
