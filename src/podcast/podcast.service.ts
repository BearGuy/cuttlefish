import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Podcast as PodcastModel, PodcastEpisode as PodcastEpisodeModel, Prisma } from '@prisma/client';

@Injectable()
export class PodcastService {
	constructor(private readonly prismaService: PrismaService) {}

	/* Base Podcast services */
	async getPodcasts(): Promise<PodcastModel[]> {
		return this.prismaService.podcast.findMany();
	}

	async getPodcastById(id: number): Promise<PodcastModel> {
		return this.prismaService.podcast.findUnique({
			where: { id: Number(id) || undefined }
		});
	}

	async createPodcast(podcast: Prisma.PodcastCreateInput): Promise<PodcastModel> {
		return this.prismaService.podcast.create({
			data: podcast
		})
	}

	async updatePodcast(id: number, podcast: Prisma.PodcastUpdateInput): Promise<PodcastModel> {
		return this.prismaService.podcast.update({
			where: { id: Number(id) || undefined },
			data: podcast,
		})
	}

	async deletePodcast(id: number): Promise<PodcastModel> {
		return this.prismaService.podcast.delete({
			where: { id },
		})
	}

	/* Podcast episodes services */
	async getPodcastEpisodes(podcastId: number): Promise<PodcastEpisodeModel[]> {
		return this.prismaService.podcastEpisode.findMany({ where: { podcastId: Number(podcastId) || undefined }});
	}

	async getPodcastEpisodeById(id: number): Promise<PodcastEpisodeModel> {
		return this.prismaService.podcastEpisode.findUnique({
			where: { id: Number(id) || undefined }
		});
	}

	async createPodcastEpisode(podcast: Prisma.PodcastEpisodeCreateInput): Promise<PodcastEpisodeModel> {
		return this.prismaService.podcastEpisode.create({
			data: podcast
		})
	}

	async updatePodcastEpisode(id: number, podcast: Prisma.PodcastEpisodeUpdateInput): Promise<PodcastEpisodeModel> {
		return this.prismaService.podcastEpisode.update({
			where: { id: Number(id) || undefined },
			data: podcast,
		})
	}

	async deletePodcastEpisode(id: number): Promise<PodcastEpisodeModel> {
		return this.prismaService.podcastEpisode.delete({
			where: { id },
		})
	}
}
