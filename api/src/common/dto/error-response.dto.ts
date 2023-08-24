import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ example: '0000-00-00T00:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: 'ERROR_CODE' })
  errorCode: string;

  @ApiProperty({ example: 'Error message' })
  message: string;
}
