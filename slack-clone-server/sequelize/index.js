const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");
import userModel from "./models/user.model";
import teamModel from "./models/team.model";
import messageModel from "./models/message.model";
import channelModel from "./models/channel.model";

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize("slack-clone", "postgres", "postgres", {
  dialect: "postgres",
});
const models = {
  User: userModel(sequelize),
  Team: teamModel(sequelize),
  Message: messageModel(sequelize),
  Channel: channelModel(sequelize),
};
// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(models);
models.sequelize = sequelize;
models.Sequelize = Sequelize;

// We export the sequelize connection instance to be used around our app.
export default models;
