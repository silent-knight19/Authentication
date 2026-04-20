import { Router } from "express";
import * as controller from "../controllers/sponsor.controller.js";
const router = Router();

router.post("/", controller.createSponsor);
router.get("/", controller.getAllSponsors);
router.get("/:id", controller.getSponsorById);
router.put("/:id", controller.updateSponsor);
router.delete("/:id", controller.deleteSponsor);

export default router;
