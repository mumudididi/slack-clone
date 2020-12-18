import { DataTypes } from "sequelize";

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
export default (sequelize) => {
  const Team = sequelize.define(
    "team",
    {
      // The following specification of the 'id' attribute could be omitted
      // since it is the default.
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      underscored: true,
    }
  );
  return Team;
};
