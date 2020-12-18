export function applyExtraSetup(sequelize) {
  const { team, message, channel, user } = sequelize.models;

  user.belongsToMany(team, {
    through: "member",
    foreignKey: "userId",
  });

  // Team
  team.belongsToMany(user, {
    through: "member",
    foreignKey: "teamId",
  });
  team.belongsTo(user, {
    foreignKey: "owner",
  });

  // Message

  message.belongsTo(channel, {
    foreignKey: "channelId",
  });
  message.belongsTo(user, {
    foreignKey: "userId",
  });

  //Channel

  channel.belongsTo(team, {
    foreignKey: "teamId",
  });
}
