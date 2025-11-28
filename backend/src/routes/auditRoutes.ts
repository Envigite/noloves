import { Router } from "express";
import { getLogs } from "../controllers/auditController";

const router = Router();

router.get("/", getLogs);

export default router;