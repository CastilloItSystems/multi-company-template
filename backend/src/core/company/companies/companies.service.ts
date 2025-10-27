import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AssignUserDto } from './dto/assign-user.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const existingCompany = await this.prisma.company.findUnique({
      where: { code: createCompanyDto.code },
    });

    if (existingCompany) {
      throw new ConflictException('Company code already exists');
    }

    return this.prisma.company.create({
      data: createCompanyDto,
      include: {
        userCompanies: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: {
        userCompanies: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        userCompanies: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  async findByCode(code: string) {
    return this.prisma.company.findUnique({
      where: { code },
      include: {
        userCompanies: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    await this.findOne(id);

    if (updateCompanyDto.code) {
      const existingCompany = await this.prisma.company.findUnique({
        where: { code: updateCompanyDto.code },
      });

      if (existingCompany && existingCompany.id !== id) {
        throw new ConflictException('Company code already exists');
      }
    }

    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
      include: {
        userCompanies: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.company.delete({
      where: { id },
    });
  }

  async assignUser(companyId: string, assignUserDto: AssignUserDto) {
    await this.findOne(companyId);

    const user = await this.prisma.user.findUnique({
      where: { id: assignUserDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existing = await this.prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId: assignUserDto.userId,
          companyId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('User already assigned to this company');
    }

    return this.prisma.userCompany.create({
      data: {
        userId: assignUserDto.userId,
        companyId,
        role: assignUserDto.role,
      },
      include: {
        user: true,
        company: true,
      },
    });
  }

  async removeUser(companyId: string, userId: string) {
    const userCompany = await this.prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });

    if (!userCompany) {
      throw new NotFoundException('User is not assigned to this company');
    }

    return this.prisma.userCompany.delete({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });
  }

  async getCompanyUsers(companyId: string) {
    await this.findOne(companyId);

    return this.prisma.userCompany.findMany({
      where: { companyId },
      include: {
        user: true,
      },
    });
  }

  async getActiveCompanies() {
    return this.prisma.company.findMany({
      where: { active: true },
      include: {
        userCompanies: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
