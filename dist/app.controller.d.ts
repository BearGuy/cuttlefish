import { AppService } from './app.service';
import { Request } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getSveleteApp(req: Request): {
        url: string;
    };
}
