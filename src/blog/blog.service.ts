import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/blog.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>){}

    async createBlog(createPostDTO: CreatePostDTO) : Promise<Post>{
        const newBlog = await this.postModel(createPostDTO);
        return newBlog.save();
    }


    async getBlog() : Promise<Post[]> {
        return await this.postModel.find().exec();
    }


    async showBlog(postId: string) : Promise<Post> {
        const blog = await this.postModel.findById(postId).exec();
        return blog;
    }


    async editBlog(postId: string, createPostDTO: CreatePostDTO) : Promise<Post> {
        const blog = await this.postModel.findByIdAndUpdate(postId, createPostDTO, { new: true });
        return blog;
    }


    async deleteBlog(postId: string) : Promise<any> {
        const deletedPost = await this.postModel.findByIdAndRemove(postId);
        return deletedPost;
    }


}
