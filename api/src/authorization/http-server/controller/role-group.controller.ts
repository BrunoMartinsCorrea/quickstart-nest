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
import { RoleGroupService } from '@/authorization/domain/service/role-group.service';
import { RoleGroupDto } from '../dto/role-group.dto';
import { RoleGroup } from '@/authorization/domain/model/role-group';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { Response as ExpressResponse } from 'express';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';

@ApiTags('Role Group')
@Controller('role-group')
export class RoleGroupController {
  constructor(private readonly service: RoleGroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async create(@Body() createRoleGroupDto: RoleGroupDto, @Res() response: ExpressResponse) {
    return this.service.create(createRoleGroupDto).then((it) => {
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
    } as PaginatedResponseDto<RoleGroup>;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() roleGroupDto: RoleGroupDto) {
    return await this.service.update(id, roleGroupDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.softDelete(id);
  }
}
