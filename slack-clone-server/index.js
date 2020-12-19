import app from "./express/app";
import models from "./sequelize";
const sequelize = models.sequelize;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    sequelize.authenticate().then(() => {
      console.log("Database connection OK!");
    });
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
}

init();

sequelize.sync().then(() => {
  // sequelize.sync({ force: true }).then(() => {
  app.listen(8081);
});
