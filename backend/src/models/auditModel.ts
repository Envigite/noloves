import { pool } from "../config/db";

export interface AuditLogEntry {
  user_id: string;
  action: string;
  entity: string;
  entity_id?: string;
  details?: any;
}

export const AuditModel = {
  createLog: async (entry: AuditLogEntry) => {
    const { user_id, action, entity, entity_id, details } = entry;

    const query = `
      INSERT INTO audit_logs (user_id, action, entity, entity_id, details)
      VALUES ($1, $2, $3, $4, $5)
    `;

    const detailsJson = details ? JSON.stringify(details) : null;

    try {
      await pool.query(query, [user_id, action, entity, entity_id, detailsJson]);
    } catch (error) {
      console.error("Error creating audit log:", error);
    }
  },

  getLogs: async (limit = 50) => {
    const query = `
      SELECT a.*, u.username as admin_name 
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }
};