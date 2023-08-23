import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { RoleService } from '@/authorization/domain/service/role.service';
import { RoleDto } from '../dto/role.dto';
import { Role } from '@/authorization/domain/model/role';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { Response as ExpressResponse } from 'express';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async create(@Body() createRoleDto: RoleDto, @Res() response: ExpressResponse) {
    return this.service.create(createRoleDto as Role).then((it) => {
      return response.setHeader('Location', `${response.req.url}/${it.id}`).send(it);
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findAll(@Query('page', ParseIntPipe) page: number, @Query('limit', ParseIntPipe) limit: number) {
    const [results, totalCount] = await this.service.findAll({
      limit,
      page,
    });

    return {
      results,
      totalCount,
      page,
      limit,
    } as PaginatedResponseDto<Role>;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findOne(@Param('id') id: string) {
    return (await this.service.findOne(id)) as RoleDto;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id') id: string, @Body() roleDto: RoleDto) {
    return (await this.service.update(roleDto as Role)) as RoleDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
