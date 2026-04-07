import { defineLink } from "@moetnavss/framework/utils"
import ProductModule from "@moetnavss/medusa/product"
import Translation from "../modules/translation"

export default defineLink(
  ProductModule.linkable.product.id,
  Translation.linkable.translation.id
)
