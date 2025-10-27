import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  VIEWER = 'viewer',
}

export class AssignCompanyDto {
  @ApiProperty({
    example: 'clxxx123456789',
    description: 'ID de la empresa',
  })
  @IsString()
  companyId: string;

  @ApiProperty({
    example: 'admin',
    description: 'Rol del usuario en la empresa',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
