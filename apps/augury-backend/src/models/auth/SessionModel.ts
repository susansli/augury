const getSession = (): string => {
  // Run logic here, e.g. (assuming this function takes a parameter, email)

  // const user = await UserSchema.findOne({email: email});

  // if (!user) {
  //  throw new ClientError('This email does not exist.');
  // }

  // Do more stuff with the user...

  // Let's say we are trying to fetch something from the DB by using the user's id as FK but we don't find it
  // This means something went wrong with our DB or an error in our records...
  // Then we throw an error like this example:
  // throw new ApiError(`There was an error fetching buying history for user ${user._id}`);

  return 'This is a session object...';
};

export default module.exports = {
  getSession,
};
