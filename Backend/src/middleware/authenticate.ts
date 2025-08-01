import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authenticateCookie = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if(!token){
        logger.error('No token cookie found');
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decodedToken;
        next();
    } catch (error) {
        logger.error('Token verification failed:', error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export const generateToken = (payload: {userId: number, email: string}) => {

    if(!payload || !payload.userId || !payload.email){
        logger.error('Payload is required for token generation');
    }

    logger.info('Generating JWT token for payload userId:', JSON.stringify(payload.userId));
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "5h"
    });
};

export const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict' as const,
    maxAge: 5 * 60 * 60 * 1000, 
    path: '/', 
    domain: process.env.COOKIE_DOMAIN || undefined 
};

export const setCookie = (res: Response, token: string) => {
    res.cookie('token', token, cookieOptions);
}

export const clearAuthCookie = (res: Response) => {
    res.clearCookie('token', {
        ...cookieOptions,
        maxAge: 0
    });
};



