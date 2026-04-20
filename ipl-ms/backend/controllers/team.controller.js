import * as teamService from "../services/team.service.js";
import ApiResponse from "../utils/api-response.js";

const createTeam = async (req, res) => {
  const team = await teamService.createTeam(req.body);
  res.status(201).json(ApiResponse.created("Team created successfully", team));
};

const getAllTeams = async (req, res) => {
  const teams = await teamService.getAllTeams();
  res.status(200).json(ApiResponse.ok("Teams fetched successfully", teams));
};

const getTeamById = async (req, res) => {
  const team = await teamService.getTeamById(req.params.id);
  res.status(200).json(ApiResponse.ok("Team fetched successfully", team));
};

const updateTeam = async (req, res) => {
  const updatedTeam = await teamService.updateTeam(req.params.id, req.body);
  res.status(200).json(ApiResponse.ok("Team updated successfully", updatedTeam));
};

const deleteTeam = async (req, res) => {
  await teamService.deleteTeam(req.params.id);
  res.status(200).json(ApiResponse.ok("Team deleted successfully"));
};

export { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };
