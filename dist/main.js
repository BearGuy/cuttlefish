"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: false });
    app.enableCors();
    app.setGlobalPrefix('api/v1', {
        exclude: [
            { path: 'health', method: common_1.RequestMethod.GET },
            { path: 'rss', method: common_1.RequestMethod.GET },
        ],
    });
    await app.listen(3001);
    common_1.Logger.log(`server listening: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map