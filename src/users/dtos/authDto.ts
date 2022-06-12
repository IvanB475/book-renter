import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({required: true, description: 'username for your account'})
    username: string;
    @ApiProperty({required: true, description: 'password for your account'})
    password: string;
}

