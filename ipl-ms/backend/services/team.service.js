import ApiError from "../utils/api-error.js";
import Team from "../models/team.model.js";

const createTeam = async ({ name, ownerId }) => {
  const team = await Team.create({ name, ownerId });
  return team;
};

const getAllTeams = async () => {
  const teams = await Team.find().populate("ownerId", "name company");
  return teams;
};

const getTeamById = async (id) => {
  const team = await Team.findById(id).populate("ownerId", "name company");
  if (!team) {
    throw ApiError.notFound("Team not found");
  }
  return team;
};

const updateTeam = async (id, { name, ownerId }) => {
  const team = await Team.findByIdAndUpdate(
    id,
    { name, ownerId },
    { new: true, runValidators: true }
  ).populate("ownerId", "name company");
  if (!team) {
    throw ApiError.notFound("Team not found");
  }
  return team;
};

const deleteTeam = async (id) => {
  const team = await Team.findByIdAndDelete(id);
  if (!team) {
    throw ApiError.notFound("Team not found");
  }
  return team;
};

export { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };
