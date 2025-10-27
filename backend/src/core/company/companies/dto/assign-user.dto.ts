import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer',
}

export class AssignUserDto {
  @ApiProperty({
    example: 'clxxx123456789',
    description: 'ID del usuario',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'admin',
    description: 'Rol del usuario en la empresa',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
