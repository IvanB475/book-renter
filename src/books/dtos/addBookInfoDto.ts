import { ApiProperty } from "@nestjs/swagger";

export class AddBookInfoDto {
    @ApiProperty({ required: true, description: 'name of the book' })
    name: string;
    @ApiProperty({ required: false, description: 'author of the book' })
    author?: string;
    @ApiProperty({ required: false, description: 'description of the book' })
    description?: string;
    @ApiProperty({ required: true, description: 'How many copies of the book are available', minimum: 1 })
    totalAmountAvailable: number;
    @ApiProperty({ required: false, description: 'How many copies are currently rented', default: 0 })
    currentlyRented?: number;
    @ApiProperty({ required: false, description: 'url to image of a book' })
    image?: string;
}