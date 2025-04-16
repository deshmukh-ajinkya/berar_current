import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  user: icon('ic-user'),
  calendar: icon('ic-calendar'),
  menuItem: icon('ic-menu-item'),
  dashboard: icon('ic-dashboard'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Dashboard',
    items: [{ title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  /**
   * Management
   */
  // {
  //   subheader: 'Management',
  //   items: [
  //     // {
  //     //   title: 'System Setup',
  //     //   path: paths.dashboard.root,
  //     //   icon: ICONS.user,
  //     //   children: [
  //     //     { title: 'Menu', path: paths.dashboard.menu },
  //     //   ],

  //     // },
  //   ],
  // },
];
