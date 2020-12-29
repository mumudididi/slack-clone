import formatErrors from "../utils/formatErrors";
import { requiresAuth } from "../utils/permission";
export default {
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        try {
          const team = await models.Team.create({ ...args, owner: user.id });
          await models.Channel.create({
            name: "general",
            public: true,
            teamId: team.id,
          });
          return {
            ok: true,
            team,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            errors: formatErrors(err),
          };
        }
      }
    ),
  },
  Query: {
    allTeams: requiresAuth.createResolver(
      async (parent, args, { models, user }) =>
        await models.Team.findAll({ where: { owner: user.id } }, { raw: true })
    ),
  },
  Team: {
    channels: (parent, args, { models }) =>
      models.Channel.findAll({ where: { teamId: parent.id } }),
  },
};
