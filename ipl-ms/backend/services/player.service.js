import ApiError from "../utils/api-error.js";
import Team from "../models/team.model.js";
import Player from "../models/player.model.js";

const createPlayer = async ({ name, role, teamId }) => {
  const team = await Team.findById(teamId);
  if (!team) {
    throw ApiError.notFound("Team not found");
  }
  const player = await Player.create({ name, role, teamId });
  return player;
};

const getAllPlayers = async () => {
  const players = await Player.find().populate("teamId", "name");
  return players;
};

const getPlayerById = async (id) => {
  const player = await Player.findById(id).populate("teamId", "name");
  if (!player) {
    throw ApiError.notFound("Player not found");
  }
  return player;
};

const updatePlayer = async (id, { name, role, teamId }) => {
  const player = await Player.findByIdAndUpdate(
    id,
    { name, role, teamId },
    { new: true, runValidators: true }
  ).populate("teamId", "name");
  if (!player) {
    throw ApiError.notFound("Player not found");
  }
  return player;
};

const deletePlayer = async (id) => {
  const player = await Player.findByIdAndDelete(id);
  if (!player) {
    throw ApiError.notFound("Player not found");
  }
  return player;
};

const transferPlayer = async (playerId, newTeamId) => {
  const team = await Team.findById(newTeamId);
  if (!team) {
    throw ApiError.notFound("Team not found");
  }

  const player = await Player.findByIdAndUpdate(
    playerId,
    { teamId: newTeamId },
    { new: true, runValidators: true }
  ).populate("teamId", "name");

  if (!player) {
    throw ApiError.notFound("Player not found");
  }
  return player;
};

const updatePlayerRole = async (playerId, role) => {
  const player = await Player.findByIdAndUpdate(
    playerId,
    { role },
    { new: true, runValidators: true }
  ).populate("teamId", "name");

  if (!player) {
    throw ApiError.notFound("Player not found");
  }
  return player;
};

export {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  transferPlayer,
  updatePlayerRole,
};