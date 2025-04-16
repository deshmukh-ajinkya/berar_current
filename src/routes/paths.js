// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',

  page603: '/error/603',
  page604: '/error/604',
  page600: '/error/600',
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    verify: `${ROOTS.AUTH}/verify`,
    forgot_password: `${ROOTS.AUTH}/forgot-password`,
    reset_password: `${ROOTS.AUTH}/reset-password`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    lan_details: `${ROOTS.DASHBOARD}/lan-details/view`,
  },
};
