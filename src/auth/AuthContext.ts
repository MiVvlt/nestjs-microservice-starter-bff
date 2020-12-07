import {Request, Response} from 'express';

export interface AuthContext {
    req: Request,
    res: Response,
    user: any,
    token: string
}
