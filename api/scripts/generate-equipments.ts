import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const DEFAULT_EQUIPMENT_COUNT = 500;

function parseCountArg(): number {
  const countArg = process.argv.find((arg) => arg.startsWith('--count='));
  if (countArg) {
    const value = parseInt(countArg.split('=')[1], 10);
    if (!isNaN(value) && value > 0) return value;
    console.warn('invalid --count argument, using default...');
  }
  return DEFAULT_EQUIPMENT_COUNT;
}

const EQUIPMENT_COUNT = parseCountArg();

async function getLeafEquipmentTypes() {
  return await prisma.equipmentType.findMany({
    where: {
      children: { none: {} },
      parent: {
        parent: {
          parent: {},
          parentId: { not: null },
        },
        parentId: { not: null },
      },
      parentId: { not: null },
    },
  });
}

async function main() {
  const leafTypes = await getLeafEquipmentTypes();
  if (leafTypes.length === 0) {
    console.error('No leaf equipment types found.');
    process.exit(1);
  }

  const equipments = Array.from({ length: EQUIPMENT_COUNT }).map(() => {
    const type = faker.helpers.arrayElement(
      leafTypes,
    ) as (typeof leafTypes)[number];
    return {
      name: faker.commerce.productName(),
      brand: faker.company.name(),
      model: faker.string.alphanumeric({ length: 8 }).toUpperCase(),
      equipmentTypeId: type.id!,
    };
  });

  await prisma.equipment.createMany({ data: equipments });
  console.log(`${EQUIPMENT_COUNT} equipments generated.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
