import * as sponsorService from "../services/sponsor.service.js";
import ApiResponse from "../utils/api-response.js";

const createSponsor = async (req, res) => {
  const sponsor = await sponsorService.createSponsor(req.body);
  res.status(201).json(ApiResponse.created("Sponsor created successfully", sponsor));
};

const getAllSponsors = async (req, res) => {
  const sponsors = await sponsorService.getAllSponsors();
  res.status(200).json(ApiResponse.ok("Sponsors fetched successfully", sponsors));
};

const getSponsorById = async (req, res) => {
  const sponsor = await sponsorService.getSponsorById(req.params.id);
  res.status(200).json(ApiResponse.ok("Sponsor fetched successfully", sponsor));
};

const updateSponsor = async (req, res) => {
  const updatedSponsor = await sponsorService.updateSponsor(req.params.id, req.body);
  res.status(200).json(ApiResponse.ok("Sponsor updated successfully", updatedSponsor));
};

const deleteSponsor = async (req, res) => {
  await sponsorService.deleteSponsor(req.params.id);
  res.status(200).json(ApiResponse.ok("Sponsor deleted successfully"));
};

export { createSponsor, getAllSponsors, getSponsorById, updateSponsor, deleteSponsor };
