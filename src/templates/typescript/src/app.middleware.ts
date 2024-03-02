import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export function notFoundHandler(req: Request, res: Response, next: NextFunction): Response | void {
  const isApiPrefix = req.url.match(/^\/api\/v\d\//) || req.url.match(/^\/api\//);

  if (isApiPrefix) {
    return res.error({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Resource not found',
      error: 'Resource not found'
    });
  }

  return res.status(StatusCodes.NOT_FOUND).render('not-found.html', {
    title: 'Not found'
  });
}


export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isHttpError = err instanceof HttpError;
  const isZodError = err instanceof ZodError;

  const response = {
    success: false,
    statusCode: isHttpError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR,
    message: isHttpError ? err.message : 'Internal server error',
    error: isDevelopment && !isZodError ? err.stack : err.message
  };

  if (isZodError) {
    response.message = 'Validation error';
    response.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    response.error = err.issues as any;
  }

  const isApiPrefix = req.url.match(/^\/api\/v\d\//) || req.url.match(/^\/api\//);

  if (isApiPrefix) {
    return res.error(response);
  }

  if (isZodError && !isApiPrefix) {
    req.flash('error', (response.error as any).map((e: any) => e.message).join(' '));
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).redirect(req.originalUrl);
  }

  return res.status(response.statusCode).render('error.html', {
    title: 'Error',
    error: response.error
  });
}
