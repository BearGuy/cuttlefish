import * as argon2 from 'argon2';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PodcastService } from './podcast.service';

const test_podcasts = [
  { name: 'The Peterkins Podcast', description: 'A really great podcast' },
]
let podcast_id = 1;

async function initializePodcastDatabase() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [PrismaModule],
    providers: [PodcastService],
  }).compile();

  let service = module.get<PrismaService>(PrismaService);

  let test_user = await service.user.create({
    data: {
      email: 'test@example.com',
      password: await argon2.hash('password')
    }
  })

  const podcasts = await Promise.all(
    test_podcasts.map((podcast) => {
      return service.podcast.create({
        data: { ...podcast, authorId: test_user.id }
      })
    })
  );

  console.log({ podcasts });

  podcast_id = podcasts[0].id;

  return podcasts;
}

async function clearPodcastDatabase() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [PrismaModule],
    providers: [PodcastService],
  }).compile();

  let service = module.get<PrismaService>(PrismaService);
  return service.user.delete({ where: { email: 'test@example.com' } });
}

describe('PodcastService', () => {
  let service: PodcastService;

  beforeAll(async () => {
    return await initializePodcastDatabase();
  });

  afterAll(async () => {
    return await clearPodcastDatabase();
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [PodcastService],
    }).compile();

    service = module.get<PodcastService>(PodcastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // test the findAll function
  it('findAll - Gets all podcasts', async () => {
    const all_podcasts = await service.getPodcasts();
    expect(all_podcasts.length).toBe(test_podcasts.length);
    const podcast = all_podcasts[0];
    expect(podcast).toHaveProperty("id");
    expect(podcast).toHaveProperty("name", test_podcasts[0].name);
    expect(podcast).toHaveProperty("description", test_podcasts[0].description);
    expect(podcast).toHaveProperty("published", false);
    expect(podcast).toHaveProperty("authorId");
  });

  // test the findOneById function
  // 1. Returns podcast if found
  it('findOneById - returns existing podcast', async () => {
    const podcast = await service.getPodcastById(podcast_id);
    expect(podcast).toBeDefined();
    expect(podcast).toHaveProperty("id");
    expect(podcast).toHaveProperty("name");
    expect(podcast).toHaveProperty("description");
    expect(podcast).toHaveProperty("published");
    expect(podcast).toHaveProperty("authorId");
  });
  // 2. Returns null if not found
  it('findOneById - returns null if podcast does not exist', async () => {
    const podcast = await service.getPodcastById(10000);
    expect(podcast).toBeNull();
  });

  // test create podcast function
  // 1. Test with happy path
  //   a. Test that optional condition 'published' can be set
  it('createPodcast - creates podcast', () => {});
  // 2. Test without name that it fails
  // 3. Test without description that it fails

  // Test update podcast function
  it('updatePodcast - updates podcast', () => {});

  // Test delete podcast functio
  it('deletePodcast - deletes podcast', () => {});
});
