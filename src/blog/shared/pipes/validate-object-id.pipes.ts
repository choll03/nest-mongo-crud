import { PipeTransform, BadRequestException, Injectable } from "@nestjs/common";
import * as mongoose from 'mongoose';


@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    
    async transform(value: string) : Promise<string>{

        const isValid = mongoose.Types.ObjectId.isValid(value);

        if(!isValid) {
            throw new BadRequestException('Invalid ID');
        }

        return value;
    }

}