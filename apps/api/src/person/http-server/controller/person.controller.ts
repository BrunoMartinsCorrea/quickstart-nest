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
import { ApiConflictResponse, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/common/dto/error-response.dto';
import { Person } from '@/person/domain/model/person';
import { PersonService } from '@/person/domain/service/person.service';
import { Response as ExpressResponse } from 'express';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { CreatePersonDto } from '../dto/create-person.dto';
import { PersonDto } from '../dto/person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly service: PersonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  async create(@Body() createPersonDto: CreatePersonDto, @Res() response: ExpressResponse) {
    return this.service.create(createPersonDto as Person).then((it) => {
      return response.setHeader('Location', `${response.req.url}/${it.id}`).send(it as PersonDto);
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
    } as PaginatedResponseDto<Person>;
  }

  @Get(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const foundPerson = await this.service.findOne(id);
    return foundPerson as PersonDto;
  }

  @Put(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePersonDto: UpdatePersonDto) {
    const updatedPerson = await this.service.update({ id, ...updatePersonDto } as Person);
    return updatedPerson as PersonDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.softDelete(id);
  }
}
