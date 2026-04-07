import { Entity, Property } from "@moetnavss/deps/mikro-orm/core"

@Entity()
export class Entity2 {
  @Property({ columnType: "int" })
  id!: number
}
