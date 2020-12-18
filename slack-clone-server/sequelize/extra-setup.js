export function applyExtraSetup(models) {
  const { Team, Message, Channel, User } = models;

  User.belongsToMany(Team, {
    through: "member",
    foreignKey: "userId",
  });

  // Team
  Team.belongsToMany(User, {
    through: "member",
    foreignKey: "teamId",
  });
  Team.belongsTo(User, {
    foreignKey: "owner",
  });

  // Message

  Message.belongsTo(Channel, {
    foreignKey: "channelId",
  });
  Message.belongsTo(User, {
    foreignKey: "userId",
  });

  //Channel

  Channel.belongsTo(Team, {
    foreignKey: "teamId",
  });
}
