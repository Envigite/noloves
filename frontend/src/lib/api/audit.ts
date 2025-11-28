export interface AuditLog {
  id: number;
  user_id: string;
  admin_name?: string;
  action: string;
  entity: string;
  entity_id?: string;
  details?: any;
  created_at: string;
}

export const fetchAuditLogs = async (): Promise<AuditLog[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audit`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Error al obtener el historial");
  }

  return res.json();
};