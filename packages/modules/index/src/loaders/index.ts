import { asClass, asValue } from "@moetnavss/framework/awilix"
import { PostgresProvider } from "../services/postgres-provider"
import { MikroOrmBaseRepository as BaseRepository } from "@moetnavss/framework/utils"
import { IndexModuleService } from "@services"
import { LoaderOptions } from "@moetnavss/framework/types"

export default async ({ container, options }: LoaderOptions): Promise<void> => {
  container.register({
    baseRepository: asClass(BaseRepository).singleton(),
    searchModuleService: asClass(IndexModuleService).singleton(),
  })

  container.register("storageProviderCtrOptions", asValue(undefined))

  container.register("storageProviderCtr", asValue(PostgresProvider))

  /*if (!options?.customAdapter) {
    container.register("storageProviderCtr", asValue(PostgresProvider))
  }  else {
    container.register(
      "storageProviderCtr",
      asValue(options.customAdapter.constructor)
    )
    container.register(
      "storageProviderCtrOptions",
      asValue(options.customAdapter.options)
    )
  }*/
}
