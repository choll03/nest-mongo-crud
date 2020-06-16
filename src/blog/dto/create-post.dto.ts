import { IsNotEmpty } from 'class-validator';

export class CreatePostDTO {

    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmpty()
    readonly body: string;
    @IsNotEmpty()
    readonly author: string;
    @IsNotEmpty()
    readonly date_posted: string;
}