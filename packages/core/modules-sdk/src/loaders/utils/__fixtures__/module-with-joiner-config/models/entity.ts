import { Entity, Property } from "@moetnavss/deps/mikro-orm/core"

@Entity()
export class EntityModel {
  @Property({ columnType: "int" })
  id!: number
}
