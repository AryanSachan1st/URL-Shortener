import { Router } from "express";
import { apiHealthCheck } from "../controllers/healthcheck.controller.js";

const router = Router()

router.route("/").get(apiHealthCheck)

export default router