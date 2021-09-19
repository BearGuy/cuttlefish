"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastModule = void 0;
const common_1 = require("@nestjs/common");
const podcast_service_1 = require("./podcast.service");
const podcast_resolver_1 = require("./podcast.resolver");
let PodcastModule = class PodcastModule {
};
PodcastModule = __decorate([
    common_1.Module({
        providers: [podcast_service_1.PodcastService, podcast_resolver_1.PodcastResolver],
        exports: [podcast_service_1.PodcastService]
    })
], PodcastModule);
exports.PodcastModule = PodcastModule;
//# sourceMappingURL=podcast.module.js.map