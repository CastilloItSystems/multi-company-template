import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { CompanyEntity } from './entities/company.entity';

@ApiTags('companies')
@Controller('companies')
@UseInterceptors(ClassSerializerInterceptor)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las empresas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas',
    type: [CompanyEntity],
  })
  async findAll() {
    const companies = await this.companiesService.findAll();
    return companies.map((company) => new CompanyEntity(company));
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener empresas activas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas activas',
    type: [CompanyEntity],
  })
  async getActiveCompanies() {
    const companies = await this.companiesService.getActiveCompanies();
    return companies.map((company) => new CompanyEntity(company));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID de la empresa' })
  @ApiResponse({
    status: 200,
    description: 'Empresa encontrada',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  async findOne(@Param('id') id: string) {
    const company = await this.companiesService.findOne(id);
    return new CompanyEntity(company);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva empresa' })
  @ApiResponse({
    status: 201,
    description: 'Empresa creada exitosamente',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 409, description: 'El código de empresa ya existe' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const company = await this.companiesService.create(createCompanyDto);
    return new CompanyEntity(company);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar empresa' })
  @ApiParam({ name: 'id', description: 'ID de la empresa' })
  @ApiResponse({
    status: 200,
    description: 'Empresa actualizada exitosamente',
    type: CompanyEntity,
  })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  @ApiResponse({ status: 409, description: 'El código de empresa ya existe' })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const company = await this.companiesService.update(id, updateCompanyDto);
    return new CompanyEntity(company);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar empresa' })
  @ApiParam({ name: 'id', description: 'ID de la empresa' })
  @ApiResponse({ status: 200, description: 'Empresa eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  async remove(@Param('id') id: string) {
    const company = await this.companiesService.remove(id);
    return new CompanyEntity(company);
  }

  @Post(':id/users')
  @ApiOperation({ summary: 'Asignar usuario a empresa' })
  @ApiParam({ name: 'id', description: 'ID de la empresa' })
  @ApiResponse({
    status: 201,
    description: 'Usuario asignado a empresa exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa o usuario no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario ya asignado a esta empresa',
  })
  async assignUser(
    @Param('id') id: string,
    @Body() assignUserDto: AssignUserDto,
  ) {
    return this.companiesService.assignUser(id, assignUserDto);
  }

  @Delete(':companyId/users/:userId')
  @ApiOperation({ summary: 'Remover usuario de empresa' })
  @ApiParam({ name: 'companyId', description: 'ID de la empresa' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario removido de la empresa exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Asociación no encontrada' })
  async removeUser(
    @Param('companyId') companyId: string,
    @Param('userId') userId: string,
  ) {
    return this.companiesService.removeUser(companyId, userId);
  }

  @Get(':id/users')
  @ApiOperation({ summary: 'Obtener usuarios de la empresa' })
  @ApiParam({ name: 'id', description: 'ID de la empresa' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios de la empresa',
  })
  @ApiResponse({ status: 404, description: 'Empresa no encontrada' })
  async getCompanyUsers(@Param('id') id: string) {
    return this.companiesService.getCompanyUsers(id);
  }
}
