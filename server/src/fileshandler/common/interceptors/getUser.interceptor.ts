import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Observable } from "rxjs";
import { Request } from 'express';


@Injectable()
export class GetUserInterceptor implements NestInterceptor {

    constructor(private readonly jwtService: JwtService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();

        const access_token: string = req.cookies.access_token;
        try {
            const user = this.jwtService.verify(access_token);
            req.user = user;
        } catch (err) {
            req.user = null;
        }
        return next.handle();
    }
}