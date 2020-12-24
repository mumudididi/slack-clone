import bcrypt from "bcrypt";
export default {
  Query: {
    getUser: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    //context :store data base (sequelize) connection
    register: async (parent, { password, ...otherArguments }, { models }) => {
      try {
        const hasedpsword = await bcrypt.hash(password, 12);
        await models.User.create({ ...otherArguments, password: hasedpsword });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
