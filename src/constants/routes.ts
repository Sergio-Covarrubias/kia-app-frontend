const ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  FORM: "/form",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS_BASE: "/admin/users",
  ADMIN_USERS: (action: string) => `${ROUTES.ADMIN_USERS_BASE}?action=${action}`,
  ADMIN_RESIDUES: "/admin/resources",
};

export default ROUTES;
