export class PostResponseDto {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  images: string[];
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author?: {
    id: string;
    name: string;
    email: string;
  };
}
