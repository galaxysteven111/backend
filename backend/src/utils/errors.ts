/** Base application error with HTTP status code */
export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = '資源不存在') {
    super(404, message, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class BadRequestError extends AppError {
  constructor(message = '請求參數錯誤') {
    super(400, message, 'BAD_REQUEST');
    this.name = 'BadRequestError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = '未授權') {
    super(401, message, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = '無權限') {
    super(403, message, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

/** Format error for API response. Hides internals in production. */
export function formatErrorResponse(err: unknown, isProduction: boolean) {
  if (err instanceof AppError) {
    return {
      error: err.message,
      ...(err.code && { code: err.code }),
    };
  }

  const message = isProduction ? '內部服務器錯誤' : (err instanceof Error ? err.message : '內部服務器錯誤');
  return { error: message };
}
