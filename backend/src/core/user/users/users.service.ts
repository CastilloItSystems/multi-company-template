import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignCompanyDto } from './dto/assign-company.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      include: {
        userCompanies: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        userCompanies: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userCompanies: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        userCompanies: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const data: any = { ...updateUserDto };

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        userCompanies: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async assignToCompany(userId: string, assignCompanyDto: AssignCompanyDto) {
    await this.findOne(userId);

    const company = await this.prisma.company.findUnique({
      where: { id: assignCompanyDto.companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const existing = await this.prisma.userCompany.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId: assignCompanyDto.companyId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('User already assigned to this company');
    }

    return this.prisma.userCompany.create({
      data: {
        userId,
        companyId: assignCompanyDto.companyId,
        role: assignCompanyDto.role,
      },
      include: {
        user: true,
        company: true,
      },
    });
  }

  async removeFromCompany(userId: string, companyId: string) {
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

  async getUserCompanies(userId: string) {
    await this.findOne(userId);

    return this.prisma.userCompany.findMany({
      where: { userId },
      include: {
        company: true,
      },
    });
  }
}
