import ApiError from "../utils/api-error.js";
import Sponsor from "../models/sponsor.model.js";

const createSponsor = async ({ name }) => {
  const sponsor = await Sponsor.create({ name });
  return sponsor;
};

const getAllSponsors = async () => {
  const sponsors = await Sponsor.find();
  return sponsors;
};

const getSponsorById = async (id) => {
  const sponsor = await Sponsor.findById(id);
  if (!sponsor) {
    throw ApiError.notFound("Sponsor not found");
  }
  return sponsor;
};

const updateSponsor = async (id, { name }) => {
  const sponsor = await Sponsor.findByIdAndUpdate(
    id,
    { name },
    { new: true, runValidators: true }
  );
  if (!sponsor) {
    throw ApiError.notFound("Sponsor not found");
  }
  return sponsor;
};

const deleteSponsor = async (id) => {
  const sponsor = await Sponsor.findByIdAndDelete(id);
  if (!sponsor) {
    throw ApiError.notFound("Sponsor not found");
  }
  return sponsor;
};

export { createSponsor, getAllSponsors, getSponsorById, updateSponsor, deleteSponsor };
