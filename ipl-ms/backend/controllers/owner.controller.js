import * as ownerService from "../services/owner.service.js";
import ApiResponse from "../utils/api-response.js";

const createOwner = async (req, res) => {
  const owner = await ownerService.createOwner(req.body);
  res.status(201).json(ApiResponse.created("Owner created successfully", owner));
};

const getAllOwners = async (req, res) => {
  const owners = await ownerService.getAllOwners();
  res.status(200).json(ApiResponse.ok("Owners fetched successfully", owners));
};

const getOwnerById = async (req, res) => {
  const owner = await ownerService.getOwnerById(req.params.id);
  res.status(200).json(ApiResponse.ok("Owner fetched successfully", owner));
};

const updateOwner = async (req, res) => {
  const updatedOwner = await ownerService.updateOwner(req.params.id, req.body);
  res.status(200).json(ApiResponse.ok("owner updated successfully", updatedOwner));
};

const deleteOwner = async (req, res) => {
  await ownerService.deleteOwner(req.params.id);
  res.status(200).json(ApiResponse.ok("owner deleted successfully"));
};

export { createOwner, getAllOwners, getOwnerById, updateOwner, deleteOwner };
