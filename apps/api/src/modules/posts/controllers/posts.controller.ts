import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Roles } from '../../../decorators/roles.decorator';
import { RolesGuard } from '../../../guards/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async create(@Body() createPostDto: CreatePostDto, @Request() req) {
    const post = await this.postsService.create(createPostDto, req.user.id);
    return {
      success: true,
      message: 'Post created successfully',
      data: { post },
    };
  }

  @Get()
  async findAll() {
    const posts = await this.postsService.findAll();
    return {
      success: true,
      message: 'Posts retrieved successfully',
      data: { posts },
    };
  }

  @Get('featured')
  async findFeatured() {
    const posts = await this.postsService.findFeatured();
    return {
      success: true,
      message: 'Featured posts retrieved successfully',
      data: { posts },
    };
  }

  @Get('my-posts')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async findMyPosts(@Request() req) {
    const posts = await this.postsService.findByAuthor(req.user.id);
    return {
      success: true,
      message: 'My posts retrieved successfully',
      data: { posts },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    return {
      success: true,
      message: 'Post retrieved successfully',
      data: { post },
    };
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req,
  ) {
    const post = await this.postsService.update(
      id,
      updatePostDto,
      req.user.id,
      req.user.role,
    );
    return {
      success: true,
      message: 'Post updated successfully',
      data: { post },
    };
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'customer')
  async remove(@Param('id') id: string, @Request() req) {
    await this.postsService.remove(id, req.user.id, req.user.role);
    return {
      success: true,
      message: 'Post deleted successfully',
    };
  }
}
