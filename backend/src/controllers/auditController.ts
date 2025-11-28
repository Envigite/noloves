import type { Request, Response } from "express";
import { AuditModel } from "../models/auditModel";

export const getLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await AuditModel.getLogs(100);
    return res.status(200).json(logs);
  } catch (err) {
    console.error("Error al obtener logs:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};