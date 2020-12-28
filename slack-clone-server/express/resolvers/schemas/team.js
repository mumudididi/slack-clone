import formatErrors from "../utils/formatErrors";
import { requiresAuth } from "../utils/permission";
console.log("imported permission");
export default {
  Mutation: {
    createTeam: requiresAuth.createResolver(
      async (parent, args, { models, user }) => {
        console.log("resolving mutation");
        try {
          await models.Team.create({ ...args, owner: user.id });
          return {
            ok: true,
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
};
