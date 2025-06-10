const ROUTES = {
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  FORM: "/form",
  FORM_EDIT: (formId: number) => `/form?form=${formId}`,
  MANIFEST: "/manifest",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_USER_FORM: "/admin/user-form",
  ADMIN_USER_FORM_EDIT: (userId: number) => `${ROUTES.ADMIN_USER_FORM}?user=${userId}`,
  ADMIN_CHANGE_PASSWORD_BASE: "/admin/change-password",
  ADMIN_CHANGE_PASSWORD: (userId: number) => `${ROUTES.ADMIN_CHANGE_PASSWORD_BASE}?user=${userId}`,
  ADMIN_FORMS: "/admin/forms",
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
