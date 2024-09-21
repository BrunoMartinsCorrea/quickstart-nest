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
import { UserRoleClientService } from '@/authorization/domain/service/user-role-client.service';
import { UserRoleClientViewDto } from '../dto/user-role-client-view.dto';
import { UserRoleClient } from '@/authorization/domain/model/user-role-client';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { Response as ExpressResponse } from 'express';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';
import { UserRoleClientDto } from '@/authorization/http-server/dto/user-role-client.dto';
import { UserRoleClientView } from '@/authorization/domain/model/user-role-client-view';

@ApiTags('User Role Group')
@Controller('user-role-client')
export class UserRoleClientController {
  constructor(private readonly service: UserRoleClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async create(@Body() userRoleClientDto: UserRoleClientDto, @Res() response: ExpressResponse) {
    return this.service.create(userRoleClientDto as UserRoleClient).then((it) => {
      return response
        .setHeader('Location', `${response.req.url}/${it.userGroup.id}/${it.roleGroup.id}/${it.client.id}`)
        .send();
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
    } as PaginatedResponseDto<UserRoleClientView>;
  }

  @Get(':userGroupId/:roleGroupId/:clientId')
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async findOne(
    @Param('userGroupId', ParseUUIDPipe) userGroupId: string,
    @Param('roleGroupId', ParseUUIDPipe) roleGroupId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string
  ) {
    return (await this.service.findOne({
      userGroupId,
      roleGroupId,
      clientId,
    } as UserRoleClient)) as UserRoleClientViewDto;
  }

  @Delete(':userGroupId/:roleGroupId/:clientId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async remove(
    @Param('userGroupId', ParseUUIDPipe) userGroupId: string,
    @Param('roleGroupId', ParseUUIDPipe) roleGroupId: string,
    @Param('clientId', ParseUUIDPipe) clientId: string
  ) {
    return this.service.softDelete({
      userGroupId,
      roleGroupId,
      clientId,
    } as UserRoleClient);
  }
}
