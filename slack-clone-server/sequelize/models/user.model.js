import { DataTypes } from "sequelize";

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default (sequelize) => {
  console.log("function called");
  sequelize.define("user", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        // We require usernames to have length of at least 3, and
        // only use letters, numbers and underscores.
        is: /^\w{3,}$/,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER,
    // },
  });
  //   user.associate = (models) => {
  //     user.belongstomany(models.team, {
  //       through: "member",
  //       foreignkey: "userid",
  //     });
};
