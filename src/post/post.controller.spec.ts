import { Test, TestingModule } from "@nestjs/testing";
import PostController from "./post.controller";
import PostService from "./post.service";
import { HttpException, NotFoundException } from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common";
import PostNotFoundException from "./exception/postNotFound.exception";

describe("PostController", () => {
  let controller: PostController;

  const mockPostService = {
    createPost: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
        createdAt: Date.now(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService],
      controllers: [PostController],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostController>(PostController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Create a new post", () => {
    describe("Using Valid Data", () => {
      it("should return a post", async () => {
        const response = await controller.createPost({
          title: "title",
          content: "content",
        });

        expect(response).toEqual({
          id: expect.any(Number),
          createdAt: expect.any(Number),
          title: "title",
          content: "content",
        });
      });
    });
    describe("Using Invalid Data", () => {
      it("should throw an error", async () => {
        const response = await controller.createPost({
          title: "",
          content: "",
        });

        expect(response).toThrowError("Not found");
      });
    });
  });
});
