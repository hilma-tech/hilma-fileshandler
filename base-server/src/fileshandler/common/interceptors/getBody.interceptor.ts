import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from 'express';


@Injectable()
export class GetBodyInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();

        if (req.body.data) {
            try {
                req.body = JSON.parse(req.body.data);
            } catch (err) {
                console.error("FilesHandler: cannot parse body");
            }
        }
        
        return next.handle();
    }
}