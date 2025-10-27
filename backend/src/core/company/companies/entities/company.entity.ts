import { ApiProperty } from '@nestjs/swagger';
import { Company } from '@prisma/client';

export class CompanyEntity implements Company {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<CompanyEntity>) {
    Object.assign(this, partial);
  }
}
