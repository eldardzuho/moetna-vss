import { FeatureFlag, defineFileConfig } from "@moetnavss/framework/utils"
import { Migration } from "@moetnavss/framework/mikro-orm/migrations"

defineFileConfig({
  isDisabled: () => !FeatureFlag.isFeatureEnabled("custom_ff"),
})

export class MigrationTest extends Migration {
  override async up(): Promise<void> {}

  override async down(): Promise<void> {}
}
