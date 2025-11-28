import { AuditModel } from "../models/auditModel";

export const logAction = async (
  userId: string | undefined, 
  action: string, 
  entity: string, 
  entityId?: string, 
  details?: object
) => {
  if (!userId) return;

  AuditModel.createLog({
    user_id: userId,
    action,
    entity,
    entity_id: entityId,
    details
  });
};