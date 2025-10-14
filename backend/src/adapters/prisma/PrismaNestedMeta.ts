import { getDMMF } from "@prisma/dmmf";
import { PrismaClient } from "@prisma/client";

type NestedConfig = {
  owned?: boolean;
  manyToMany?: boolean;
  json?: boolean;
};

export type DotNestedMetadata = Record<string, NestedConfig>;

export async function generateNestedMeta(
  prisma: PrismaClient
): Promise<Record<string, DotNestedMetadata>> {
  const dmmf = await getDMMF({ datamodel: prisma.schema });

  const modelMap: Record<string, (typeof dmmf.datamodel.models)[0]> = {};
  dmmf.datamodel.models.forEach((m) => (modelMap[m.name] = m));

  function processModel(
    modelName: string,
    prefix = "",
    visited = new Set<string>()
  ): DotNestedMetadata {
    if (visited.has(modelName)) return {};
    visited.add(modelName);

    const meta: DotNestedMetadata = {};
    const model = modelMap[modelName];
    if (!model) return meta;

    for (const field of model.fields) {
      const key = prefix ? `${prefix}.${field.name}` : field.name;

      if (field.type === "Json") {
        meta[key] = { json: true };
        continue;
      }

      if (field.relationName) {
        const isOwned =
          field.relationFromFields && field.relationFromFields.length > 0;

        if (field.isList) {
          meta[key] = { manyToMany: true, ...(isOwned ? { owned: true } : {}) };
        } else {
          meta[key] = { owned: isOwned || undefined };
        }

        const relatedMeta = processModel(field.type, key, visited);
        Object.assign(meta, relatedMeta);
        continue;
      }
    }

    return meta;
  }

  const fullMeta: Record<string, DotNestedMetadata> = {};
  for (const modelName of Object.keys(modelMap)) {
    fullMeta[modelName] = processModel(modelName);
  }

  return fullMeta;
}
