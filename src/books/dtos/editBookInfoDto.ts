import { ApiProperty } from "@nestjs/swagger";

export class editBookInfoDto {
    @ApiProperty({ required: false, description: 'description of the book'})
    description?: string;
    @ApiProperty({ required: false, description: 'update if total amount of copies changed'})
    totalAmountAvailable?: number;
    @ApiProperty({ required: false, description: 'update if rented amount of copies changed'})
    currentlyRented?: number;
    @ApiProperty({ required: false, description: 'update to change image'})
    image?: string;
}