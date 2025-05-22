const ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  FORM: "/form",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS_BASE: "/admin/users",
  ADMIN_USERS: (action: string) => `${ROUTES.ADMIN_USERS_BASE}?action=${action}`,
  ADMIN_RESIDUES: "/admin/residues",
  ADMIN_CONTAINERS: "/admin/containers",
  ADMIN_AREAS: "/admin/areas",
  ADMIN_PROCESSING_STAGES: "/admin/processing-stages",
  ADMIN_PROVIDERS1: "/admin/providers1",
  ADMIN_SCT_CODES: "/admin/sct-codes",
  ADMIN_PROVIDERS2: "/admin/providers2",
  ADMIN_MANAGERS: "/admin/managers",
};

export default ROUTES;
