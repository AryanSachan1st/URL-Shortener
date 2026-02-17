import { getShortURL, redirectURL } from "../controllers/url.controller.js"
import { Router } from "express"

const router = Router()

router.route("/api/v1/url").post(getShortURL)
router.route("/:path").get(redirectURL)

export default router