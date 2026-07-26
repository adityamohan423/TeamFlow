const isMemberOfProject = (currProject, userId) =>
  currProject.members.find((member) => member._id.equals(userId));

export { isMemberOfProject };
