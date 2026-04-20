import * as playerService from "../services/player.service.js";
import ApiResponse from "../utils/api-response.js";

const createPlayer = async (req, res) => {
  const player = await playerService.createPlayer(req.body);
  res.status(201).json(ApiResponse.created("Player created successfully", player));
};

const getAllPlayers = async (req, res) => {
  const players = await playerService.getAllPlayers();
  res.status(200).json(ApiResponse.ok("Players fetched successfully", players));
};

const getPlayerById = async (req, res) => {
  const player = await playerService.getPlayerById(req.params.id);
  res.status(200).json(ApiResponse.ok("Player fetched successfully", player));
};

const updatePlayer = async (req, res) => {
  const updatedPlayer = await playerService.updatePlayer(req.params.id, req.body);
  res.status(200).json(ApiResponse.ok("Player updated successfully", updatedPlayer));
};

const deletePlayer = async (req, res) => {
  await playerService.deletePlayer(req.params.id);
  res.status(200).json(ApiResponse.ok("Player deleted successfully"));
};

const transferPlayer = async (req, res) => {
  const player = await playerService.transferPlayer(req.params.id, req.body.newTeamId);
  res.status(200).json(ApiResponse.ok("Player transferred successfully", player));
};

const updatePlayerRole = async (req, res) => {
  const player = await playerService.updatePlayerRole(req.params.id, req.body.role);
  res.status(200).json(ApiResponse.ok("Player role updated successfully", player));
};

export { createPlayer, getAllPlayers, getPlayerById, updatePlayer, deletePlayer, transferPlayer, updatePlayerRole };
