import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';


@Injectable()
export class HandleNoFilesInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();

        if (!req.files) {
            req.files = [];
        }

        return next.handle();
    }
}