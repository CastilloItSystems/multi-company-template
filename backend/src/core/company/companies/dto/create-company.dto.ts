import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Acme Corporation',
    description: 'Nombre de la empresa',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'ACME',
    description: 'Código único de la empresa',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: true,
    description: 'Estado activo de la empresa',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
