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
const modelDefiners = [
  userModel,
  teamModel,
  channelModel,
  messageModel,
  // require("./models/team.model"),
  // require("./models/channel.model"),
  // require("./models/message.model"),
  // require("./models/member.model"),
  // Add more models here...
  // require('./models/item'),
];
for (const definer of modelDefiners) {
  definer(sequelize);
}
// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
//   // modelDefiner(sequelize);
//   modelDefiner();
//   console.log(modelDefiner);
// }

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
export default sequelize;
