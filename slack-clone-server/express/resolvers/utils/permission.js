// credit to https://github.com/benawad/graphql-express-template/blob/32_s3_uploads/permissions.js
const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info);
      return childResolver(parent, args, context, info);
    };
    //return the result, which will be a response,  to the invocation in anther class
    return createResolver(newResolver);
  };
  return baseResolver;
};

export const requiresAuth = createResolver((parent, args, { models, user }) => {
  if (!user || !user.id) {
    throw new Error("Not authenticated");
  }
});

export const requiresAdmin = requiresAuth.createResolver(
  (parent, args, context) => {
    if (!context.user.isAdmin) {
      throw new Error("Requires admin access");
    }
  }
);

/*
the script is taken strictly from Ben Awad's repo. 
the code is very intricate, whoever wrote this is a master of javascript

on Import, before invocation, parent class will reads in all variables, 
function definitions, as well as (return) types. 
Meaning, the parent class will import requiresAuth, and will know that: 

 requiresAuth invokes createResolver(resolver) which will returns a 
 baseResolver that has a property named baseResolver.createResolver
 therefore requiresAuth.createResolver() exists.

what is going on in this script is when requiresAuth calls createResolver with the parameter 
res = (parent, args, context) => {if (!context.user.isAdmin) {throw new Error("Requires admin access");}
  }

  the create resolver function will first run with the childresolver that is passed in when requiresAuth.createResolver(...)
  was called in another class, then it will invoke res(params) with params, then it will invoke the mutations passed in 
*/
