import * as teamSponsorService from "../services/team-sponsor.service.js";
import ApiResponse from "../utils/api-response.js";

const attachSponsor = async (req, res, next) => {
  try {
    const teamSponsor = await teamSponsorService.attachSponsor(req.body);
    res.status(201).json(ApiResponse.created("Sponsor attached to team successfully", teamSponsor));
  } catch (error) {
    next(error);
  }
};

export { attachSponsor };
