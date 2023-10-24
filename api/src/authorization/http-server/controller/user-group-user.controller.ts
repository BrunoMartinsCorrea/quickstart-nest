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
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { UserGroupUserService } from '@/authorization/domain/service/user-group-user.service';
import { UserGroupUserViewDto } from '../dto/user-group-user-view.dto';
import { UserGroupUser } from '@/authorization/domain/model/user-group-user';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { Response as ExpressResponse } from 'express';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';
import { UserGroupUserDto } from '@/authorization/http-server/dto/user-group-user.dto';
import { UserGroupUserView } from '@/authorization/domain/model/user-group-user-view';

@ApiTags('User Group User')
@Controller('user-group-user')
export class UserGroupUserController {
  constructor(private readonly service: UserGroupUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async create(@Body() userGroupUserDto: UserGroupUserDto, @Res() response: ExpressResponse) {
    return this.service.create(userGroupUserDto as UserGroupUser).then((it) => {
      return response.setHeader('Location', `${response.req.url}/${it.id}`).send();
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findAll(@Query() paginatedQueryDto: PaginatedQueryDto) {
    const [results, totalCount] = await this.service.findAll(paginatedQueryDto);

    return {
      results,
      totalCount,
      ...paginatedQueryDto,
    } as PaginatedResponseDto<UserGroupUserView>;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return (await this.service.findOne(id)) as UserGroupUserViewDto;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() userGroupUserDto: UserGroupUserDto) {
    return (await this.service.update(userGroupUserDto as UserGroupUser)) as UserGroupUserViewDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.softDelete(id);
  }
}
