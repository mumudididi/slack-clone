import { DataTypes } from "sequelize";

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default (sequelize) => {
  const User = sequelize.define("user", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [3, 25],
          msg: "username needs to have at least 3, at most 25 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          arg: true,
          msg: "please enter an valid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      // validate: {
      //   len: {
      //     args: [8, 32],
      //     msg: "password needs to have at least 8, at most 32 characters",
      //   },
      // },
    },
  });
  return User;
};
