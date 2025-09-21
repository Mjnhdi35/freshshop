import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostResponseDto } from '../dto/post-response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    authorId: string,
  ): Promise<PostResponseDto> {
    const post = this.postRepository.create({
      ...createPostDto,
      authorId,
    });
    const savedPost = await this.postRepository.save(post);
    return await this.toResponseDto(savedPost);
  }

  async findAll(): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({
      where: { isPublished: true },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    return await Promise.all(posts.map((post) => this.toResponseDto(post)));
  }

  async findFeatured(): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({
      where: { isPublished: true, isFeatured: true },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    return await Promise.all(posts.map((post) => this.toResponseDto(post)));
  }

  async findByAuthor(authorId: string): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({
      where: { authorId },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    return await Promise.all(posts.map((post) => this.toResponseDto(post)));
  }

  async findOne(id: string): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Increment view count
    post.viewCount += 1;
    await this.postRepository.save(post);

    return await this.toResponseDto(post);
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    userId: string,
    userRole: string,
  ): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Only author or admin can update
    if (post.authorId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You can only update your own posts');
    }

    Object.assign(post, updatePostDto);
    const updatedPost = await this.postRepository.save(post);
    return await this.toResponseDto(updatedPost);
  }

  async remove(id: string, userId: string, userRole: string): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Only author or admin can delete
    if (post.authorId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.postRepository.delete(id);
  }

  private async toResponseDto(post: Post): Promise<PostResponseDto> {
    const author = post.author ? await post.author : undefined;
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image,
      images: post.images,
      isPublished: post.isPublished,
      isFeatured: post.isFeatured,
      tags: post.tags,
      viewCount: post.viewCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      authorId: post.authorId,
      author: author
        ? {
            id: author.id,
            name: author.name,
            email: author.email,
          }
        : undefined,
    };
  }
}
