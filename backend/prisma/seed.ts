import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Crear empresa
  const company = await prisma.company.create({
    data: {
      name: 'Empresa Demo',
      code: 'DEMO',
      active: true,
    },
  });

  // Crear usuario
  const user = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      name: 'Admin Demo',
      password: hashedPassword,
    },
  });

  // Relacionar usuario con empresa
  await prisma.userCompany.create({
    data: {
      userId: user.id,
      companyId: company.id,
      role: 'admin',
    },
  });

  console.log('✅ Seed completed');
  console.log('📧 Email: admin@demo.com');
  console.log('🔑 Password: password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
