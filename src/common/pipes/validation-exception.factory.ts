import { BadRequestException, ValidationError } from '@nestjs/common';

export const validationExceptionFactory = (
  validationErrors: ValidationError[] = [],
) => {
  const errors = {};
  validationErrors.forEach((error) => {
    errors[error.property] = Object.values(error.constraints);
  });
  return new BadRequestException({
    statusCode: 400,
    message: 'Validation Error',
    errors: errors,
  });
};
