export default {
  Mutation: {
    createChannel: async (parent, args, { models }) => {
      console.log("in mutation");
      console.log(args);
      try {
        await models.Channel.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
