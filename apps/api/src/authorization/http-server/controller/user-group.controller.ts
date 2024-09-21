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
import { UserGroupService } from '@/authorization/domain/service/user-group.service';
import { UserGroupDto } from '../dto/user-group.dto';
import { UserGroup } from '@/authorization/domain/model/user-group';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { Response as ExpressResponse } from 'express';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';

@ApiTags('User Group')
@Controller('user-group')
export class UserGroupController {
  constructor(private readonly service: UserGroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async create(@Body() createUserGroupDto: UserGroupDto, @Res() response: ExpressResponse) {
    return this.service.create(createUserGroupDto as UserGroup).then((it) => {
      return response.setHeader('Location', `${response.req.url}/${it.id}`).send(it);
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
    } as PaginatedResponseDto<UserGroup>;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return (await this.service.findOne(id)) as UserGroupDto;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() userGroupDto: UserGroupDto) {
    return (await this.service.update(userGroupDto as UserGroup)) as UserGroupDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.softDelete(id);
  }
}
