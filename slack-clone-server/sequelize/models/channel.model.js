import { DataTypes } from "sequelize";

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default (sequelize) => {
  const Channel = sequelize.define("channel", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    name: DataTypes.STRING,
    public: DataTypes.BOOLEAN,
  });
  Channel.associate = (model) => {
    Channel.belongsTo(model.Team, {
      foreignKey: "teamId",
    });
  };
};
