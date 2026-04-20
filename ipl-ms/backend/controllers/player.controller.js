import * as playerService from "../services/player.service.js";
import ApiResponse from "../utils/api-response.js";

const createPlayer = async (req, res) => {
  const player = await playerService.createPlayer(req.body);
  ApiResponse.created(res, "Player created successfully", player);
};

const getAllPlayers = async (req, res) => {
  const players = await playerService.getAllPlayers();
  ApiResponse.ok(res, "Players fetched successfully", players);
};

const getPlayerById = async (req, res) => {
  const player = await playerService.getPlayerById(req.params.id);
  ApiResponse.ok(res, "Player fetched successfully", player);
};

const updatePlayer = async (req, res) => {
  const updatedPlayer = await playerService.updatePlayer(req.params.id, req.body);
  ApiResponse.ok(res, "Player updated successfully", updatedPlayer);
};

const deletePlayer = async (req, res) => {
  await playerService.deletePlayer(req.params.id);
  ApiResponse.ok(res, "Player deleted successfully");
};

const transferPlayer = async (req, res) => {
  const player = await playerService.transferPlayer(req.params.id, req.body.newTeamId);
  ApiResponse.ok(res, "Player transferred successfully", player);
};

const updatePlayerRole = async (req, res) => {
  const player = await playerService.updatePlayerRole(req.params.id, req.body.role);
  ApiResponse.ok(res, "Player role updated successfully", player);
};

export { createPlayer, getAllPlayers, getPlayerById, updatePlayer, deletePlayer, transferPlayer, updatePlayerRole };
