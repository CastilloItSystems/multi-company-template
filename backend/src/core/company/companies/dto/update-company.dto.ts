import { PartialType } from '@nestjs/swagger';
import { CreateCompanyDto } from './create-company.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty({
    example: 'Acme Corporation Updated',
    description: 'Nombre de la empresa',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'ACME2',
    description: 'Código único de la empresa',
    required: false,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    example: false,
    description: 'Estado activo de la empresa',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
