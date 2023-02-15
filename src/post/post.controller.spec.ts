import { Test, TestingModule } from '@nestjs/testing';
import PostController from './post.controller';
import PostService from './post.service';

describe('PostController', () => {
  let controller: PostController;

  const mockPostService = {
    createPost: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto,
        createdAt: Date.now()
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
      controllers: [PostController],
    }).overrideProvider(PostService).useValue(mockPostService).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create a new post', () => {
    it('should be create a post', async () => {
      await controller.createPost({
        title: "test title",
        content: "test content"
      })
    })

    it('should return a post', async () => {
      const response = await controller.createPost({title: 'title', content: 'content'})

      expect(response).toMatchObject({
        id: expect.any(Number),
        createdAt: expect.any(Number),
        title: 'title',
        content: 'content'
      })
    })
  })


});