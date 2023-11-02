import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "https://a.rarepepe.zone/swagger/json",
  apiFile: "#rest/emptyApi.ts",
  apiImport: "emptySplitApi",
  outputFile: "../src/rest/papi.ts",
  exportName: "PAPI",
  hooks: true,
  tag: true,
};

export default config;
