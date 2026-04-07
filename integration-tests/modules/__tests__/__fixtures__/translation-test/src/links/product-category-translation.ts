import ProductModule from "@moetnavss/medusa/product"
import { defineLink } from "@moetnavss/utils"
import Translation from "../modules/translation"

export default defineLink(
  ProductModule.linkable.productCategory.id,
  Translation.linkable.translation.id
)
