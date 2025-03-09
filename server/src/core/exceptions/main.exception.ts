import { HttpException, HttpStatus } from '@nestjs/common';

export class MainException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(
      {
        statusCode,
        success: false,
        message,
      },
      statusCode,
    );
  }
}
