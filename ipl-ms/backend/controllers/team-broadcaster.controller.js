import * as teamBroadcasterService from "../services/team-broadcaster.service.js";
import ApiResponse from "../utils/api-response.js";

const assignBroadcaster = async (req, res, next) => {
  try {
    const teamBroadcaster = await teamBroadcasterService.assignBroadcaster(req.body);
    res.status(201).json(ApiResponse.created("Broadcaster assigned to team successfully", teamBroadcaster));
  } catch (error) {
    next(error);
  }
};

export { assignBroadcaster };
