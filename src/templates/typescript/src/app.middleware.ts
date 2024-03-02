import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export function healthCheckHandler(
	req: Request,
	res: Response,
	next: NextFunction,
): Response | void {
	return res.status(StatusCodes.OK).json({
		message: 'ok',
	});
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction): Response | void {
	return res.status(StatusCodes.NOT_FOUND).json({
		message: 'Resource not found',
	});
}

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
): Response | void {
	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		message: err.message,
	});
}
