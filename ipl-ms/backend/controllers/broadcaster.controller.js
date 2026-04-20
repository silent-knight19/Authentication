import * as broadcasterService from "../services/broadcaster.service.js";
import ApiResponse from "../utils/api-response.js";

const createBroadcaster = async (req, res) => {
  const broadcaster = await broadcasterService.createBroadcaster(req.body);
  res.status(201).json(ApiResponse.created("Broadcaster created successfully", broadcaster));
};

const getAllBroadcasters = async (req, res) => {
  const broadcasters = await broadcasterService.getAllBroadcasters();
  res.status(200).json(ApiResponse.ok("Broadcasters fetched successfully", broadcasters));
};

const getBroadcasterById = async (req, res) => {
  const broadcaster = await broadcasterService.getBroadcasterById(req.params.id);
  res.status(200).json(ApiResponse.ok("Broadcaster fetched successfully", broadcaster));
};

const updateBroadcaster = async (req, res) => {
  const updatedBroadcaster = await broadcasterService.updateBroadcaster(req.params.id, req.body);
  res.status(200).json(ApiResponse.ok("Broadcaster updated successfully", updatedBroadcaster));
};

const deleteBroadcaster = async (req, res) => {
  await broadcasterService.deleteBroadcaster(req.params.id);
  res.status(200).json(ApiResponse.ok("Broadcaster deleted successfully"));
};

export { createBroadcaster, getAllBroadcasters, getBroadcasterById, updateBroadcaster, deleteBroadcaster };
