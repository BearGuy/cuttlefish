import { Module } from '@nestjs/common';
import { PodcastService } from './podcast.service';
import { PodcastResolver } from './podcast.resolver';

@Module({
  providers: [PodcastService, PodcastResolver],
  exports: [PodcastService]
})
export class PodcastModule {}
