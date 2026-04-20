import * as teamBroadcasterService from "../services/team-broadcaster.service.js";
import ApiResponse from "../utils/api-response.js";

const assignBroadcaster = async (req, res) => {
  const teamBroadcaster = await teamBroadcasterService.assignBroadcaster(req.body);
  ApiResponse.created(res, "Broadcaster assigned to team successfully", teamBroadcaster);
};

export { assignBroadcaster };
