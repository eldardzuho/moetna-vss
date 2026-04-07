import { Module } from "@moetnavss/framework/utils";
import { TranslationModule } from "./service";

export const TRANSLATION = "translation";

export default Module(TRANSLATION, {
  service: TranslationModule,
});
