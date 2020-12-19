const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers } = require("@graphql-tools/merge");

const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./schemas"))
);
export default resolvers;
