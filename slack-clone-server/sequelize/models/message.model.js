import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Message = sequelize.define(
    "message",
    {
      text: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );
  return Message;
};
