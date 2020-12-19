const models = require("../sequelize");

async function reset() {
  console.log(
    "Will rewrite the postgres example database, adding some dummy data."
  );

  await models.sequelize.sync({ force: true });

  console.log("Done!");
}

reset();
