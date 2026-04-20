import * as teamSponsorService from "../services/team-sponsor.service.js";
import ApiResponse from "../utils/api-response.js";

const attachSponsor = async (req, res) => {
  const teamSponsor = await teamSponsorService.attachSponsor(req.body);
  ApiResponse.created(res, "Sponsor attached to team successfully", teamSponsor);
};

export { attachSponsor };
