import { Router } from "express";
import { apiHealthCheck } from "../controllers/healthcheck.contoller.js";

const router = Router()

router.route("/").get(apiHealthCheck)

export default router