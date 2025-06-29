import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type EquipmentTypeCSVRow = {
  Domaine: string;
  Type: string;
  Catégorie: string;
  'Sous-catégorie': string;
};

async function upsertHierarchy(row: EquipmentTypeCSVRow) {
  const names = [
    row.Domaine,
    row.Type,
    row.Catégorie,
    row['Sous-catégorie'],
  ].filter(Boolean);
  let parentId: number | null = null;

  for (const name of names) {
    if (!name) break;
    let type = await prisma.equipmentType.findFirst({
      where: { name, parentId },
    });
    if (!type) {
      type = await prisma.equipmentType.create({ data: { name, parentId } });
      console.log(`Created equipmentType: ${name} (parentId: ${parentId})`);
    }
    parentId = type.id;
  }
}

(async () => {
  const csvFilePath = path.resolve(__dirname, '../generic_equipments.csv');

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(
    fileContent,
    {
      delimiter: ',',
      columns: true,
      trim: true,
      skip_empty_lines: true,
    },
    async (error, result: EquipmentTypeCSVRow[]) => {
      if (error) {
        console.error(error);
        return;
      }

      for (const row of result) {
        await upsertHierarchy(row);
      }

      await prisma.$disconnect();
      console.log('finished import');
    },
  );
})();
