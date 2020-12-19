const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");

export const types = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./schemas"))
);
