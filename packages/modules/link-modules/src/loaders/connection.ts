import {
  InternalModuleDeclaration,
  LoaderOptions,
  ModuleServiceInitializeCustomDataLayerOptions,
  ModuleServiceInitializeOptions,
} from "@moetnavss/framework/types"
import { ModulesSdkUtils } from "@moetnavss/framework/utils"

import { EntitySchema } from "@moetnavss/framework/mikro-orm/core"

export function connectionLoader(entity: EntitySchema) {
  return async (
    {
      options,
      container,
      logger,
    }: LoaderOptions<
      | ModuleServiceInitializeOptions
      | ModuleServiceInitializeCustomDataLayerOptions
    >,
    moduleDeclaration?: InternalModuleDeclaration
  ): Promise<void> => {
    const pathToMigrations = __dirname + "/../migrations"

    await ModulesSdkUtils.mikroOrmConnectionLoader({
      moduleName: "link_module",
      entities: [entity],
      container,
      options,
      moduleDeclaration,
      logger,
      pathToMigrations,
    })
  }
}
