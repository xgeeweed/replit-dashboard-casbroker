import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  generates: {
    "graphql/generated/": {
      preset: "client",
    },
  },
};
export default config;
