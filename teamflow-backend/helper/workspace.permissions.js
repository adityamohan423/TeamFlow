const isMemberOfWorkspace = (currWorkspace, userId) =>
  currWorkspace.members.find((member) => member._id.equals(userId));

// const workspaceExist = async (workspaceId){
//   const work
// }

export { isMemberOfWorkspace };
