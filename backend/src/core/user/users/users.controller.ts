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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignCompanyDto } from './dto/assign-company.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios',
    type: [UserEntity],
  })
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return new UserEntity(user);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: UserEntity,
  })
  @ApiResponse({ status: 409, description: 'El email ya existe' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return new UserEntity(user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return new UserEntity(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return new UserEntity(user);
  }

  @Post(':id/companies')
  @ApiOperation({ summary: 'Asignar usuario a empresa' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario asignado a empresa exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o empresa no encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario ya asignado a esta empresa',
  })
  async assignToCompany(
    @Param('id') id: string,
    @Body() assignCompanyDto: AssignCompanyDto,
  ) {
    return this.usersService.assignToCompany(id, assignCompanyDto);
  }

  @Delete(':userId/companies/:companyId')
  @ApiOperation({ summary: 'Remover usuario de empresa' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiParam({ name: 'companyId', description: 'ID de la empresa' })
  @ApiResponse({
    status: 200,
    description: 'Usuario removido de la empresa exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Asociación no encontrada' })
  async removeFromCompany(
    @Param('userId') userId: string,
    @Param('companyId') companyId: string,
  ) {
    return this.usersService.removeFromCompany(userId, companyId);
  }

  @Get(':id/companies')
  @ApiOperation({ summary: 'Obtener empresas del usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas del usuario',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async getUserCompanies(@Param('id') id: string) {
    return this.usersService.getUserCompanies(id);
  }
}
