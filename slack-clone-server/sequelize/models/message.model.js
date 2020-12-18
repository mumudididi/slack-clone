import { DataTypes } from "sequelize";

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default (sequelize) => {
  const Message = sequelize.define("message", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    text: DataTypes.STRING,
    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER,
    // },
  });
  //   Message.associate = (models) => {
  //     Message.belongsToMany(models.Channel, {
  //       foreignKey: "channelId",
  //     });
  //     Message.belongsTo(model.User, {
  //       foreignKey: "userId",
  //     });
  //   };
};
