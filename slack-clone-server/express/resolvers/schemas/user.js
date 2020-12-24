import bcrypt from "bcrypt";
import _ from "lodash";
//taken from ben Awad
const formatErrors = (e, models) => {
  if (e instanceof models.Sequelize.ValidationError) {
    return e.errors.map((x) => _.pick(x, ["path", "message"]));
  }
  return [{ path: "name", message: "there's an error occur" }];
};
export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    //context :store data base (sequelize) connection
    register: async (parent, { password, ...otherArguments }, { models }) => {
      if (password.length < 5 || password.length > 32) {
        return {
          ok: false,
          errors: [
            {
              path: "password",
              message: "the password should have length between 8 and 32",
            },
          ],
        };
      }
      try {
        const hasedpsword = await bcrypt.hash(password, 12);
        const user = await models.User.create({
          ...otherArguments,
          password: hasedpsword,
        });
        return {
          ok: true,
          user: user,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models),
        };
      }
    },
  },
};
