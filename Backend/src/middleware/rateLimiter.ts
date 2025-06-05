import rateLimit from 'express-rate-limit';
import logger from '../utils/logger.js';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    handler: (req, res) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many requests from this IP, please try again after 15 minutes'
        });
    },
    standardHeaders: true, 
    legacyHeaders: false, 
});

export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    message: {
        success: false,
        message: 'Too many login attempts, please try again after an hour'
    },
    handler: (req, res) => {
        logger.warn(`Auth rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many login attempts, please try again after an hour'
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 3, 
    message: {
        success: false,
        message: 'Too many password reset attempts, please try again after an hour'
    },
    handler: (req, res) => {
        logger.warn(`Password reset rate limit exceeded for IP: ${req.ip}`);
        res.status(429).json({
            success: false,
            message: 'Too many password reset attempts, please try again after an hour'
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});