import { ApiProperty } from "@nestjs/swagger";

export class RentBookInfoDto {
    @ApiProperty({ required: false, description: 'amount of copies' })
    quantity?: number;
}