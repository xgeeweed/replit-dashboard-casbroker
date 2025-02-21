import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Try to find a driver with a specific ID from our sync data
    const driver = await prisma.driver.findFirst();

    if (driver) {
      console.log('Found driver:', driver);
    } else {
      console.log('No driver found in the database');
    }

    // Get total count of drivers
    const totalDrivers = await prisma.driver.count();
    console.log('Total number of drivers:', totalDrivers);

  } catch (error) {
    console.error('Error querying database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 