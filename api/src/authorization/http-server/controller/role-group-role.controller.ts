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
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { RoleGroupRoleService } from '@/authorization/domain/service/role-group-role.service';
import { RoleGroupRoleViewDto } from '../dto/role-group-role-view.dto';
import { RoleGroupRole } from '@/authorization/domain/model/role-group-role';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { Response as ExpressResponse } from 'express';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';
import { RoleGroupRoleDto } from '@/authorization/http-server/dto/role-group-role.dto';
import { RoleGroupRoleView } from '@/authorization/domain/model/role-group-role-view';

@ApiTags('Role Group Role')
@Controller('role-group-role')
export class RoleGroupRoleController {
  constructor(private readonly service: RoleGroupRoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async create(@Body() roleGroupRoleDto: RoleGroupRoleDto, @Res() response: ExpressResponse) {
    return this.service.create(roleGroupRoleDto as RoleGroupRole).then((it) => {
      return response.setHeader('Location', `${response.req.url}/${it.roleGroup.id}/${it.role.id}`).send();
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
    } as PaginatedResponseDto<RoleGroupRoleView>;
  }

  @Get(':roleGroupId/:roleId')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findOne(
    @Param('roleGroupId', ParseUUIDPipe) roleGroupId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string
  ) {
    return (await this.service.findOne({ roleGroupId, roleId } as RoleGroupRole)) as RoleGroupRoleViewDto;
  }

  @Delete(':roleGroupId/:roleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async remove(
    @Param('roleGroupId', ParseUUIDPipe) roleGroupId: string,
    @Param('roleId', ParseUUIDPipe) roleId: string
  ) {
    return this.service.softDelete({ roleGroupId, roleId } as RoleGroupRole);
  }
}
