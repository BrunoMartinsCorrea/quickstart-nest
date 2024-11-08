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
import { Event } from '@/event/domain/model/event';
import { EventService } from '@/event/domain/service/event.service';
import { Response as ExpressResponse } from 'express';
import { PaginatedQueryDto } from '@/common/dto/paginated-query.dto';
import { PaginatedResponseDto } from '@/common/dto/paginated-response.dto';
import { CreateEventDto } from '../dto/create-event.dto';
import { EventDto } from '../dto/event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { EventView } from '@/event/domain/model/event-view';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly service: EventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiConflictResponse({ type: ErrorResponseDto })
  async create(@Body() createEventDto: CreateEventDto, @Res() response: ExpressResponse) {
    return this.service.create(createEventDto as Event).then((it) => {
      return response.setHeader('Location', `${response.req.url}/${it.id}`).send(it as EventDto);
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
    } as PaginatedResponseDto<EventView>;
  }

  @Get(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  async findOne(@Param('userId', ParseUUIDPipe) userId: string) {
    const foundEvent = await this.service.findOne({ userId } as Event);
    return foundEvent as EventDto;
  }

  @Put(':id')
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEventDto: UpdateEventDto) {
    const updatedEvent = await this.service.update({ id, ...updateEventDto } as Event);
    return updatedEvent as EventDto;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.softDelete(id);
  }
}
