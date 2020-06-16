import { Controller, Get, Res, Post, Put, Delete, Body, HttpStatus, Query, NotFoundException, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blogs')
export class BlogController {

    constructor(private blogService: BlogService){}

    @Post()
    async createBlog(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newBlog = await this.blogService.createBlog(createPostDTO);
        return res.status(HttpStatus.CREATED).json({
            message: 'Data berhasil dibuat',
            post: newBlog
        });
    }

    
    @Get()
    async getBlog(@Res() res) {
        const blogs = await this.blogService.getBlog();
        return res.status(200).json(blogs);
    }


    @Get(':postID')
    async showBlog(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        const blog = await this.blogService.showBlog(postID);
        return res.status(200).json({
            data: blog
        });
    }


    @Put(':postID')
    async updateBlog(
        @Res() res, 
        @Param('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO
        ) {
        
        const updateBlog = await this.blogService.editBlog(postID, createPostDTO);
        return res.status(200).json({
            message: 'Data berhasil dirubah',
            post: updateBlog
        });
    }


    @Delete(':postID')
    async deleteBlog(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
        
        const deletedPost = await this.blogService.deleteBlog(postID);

        if (!deletedPost) {
            throw new NotFoundException('Post does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost,
        });
    }
}
