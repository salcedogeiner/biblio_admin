// import { NbMenuItem } from '@nebular/theme';
import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
    key: 'dashboard',
  },
  {
    title: 'Biblioteca',
    icon: 'nb-compose',
    link: '/pages/biblioteca',
    key: 'biblioteca',
    children: [
      {
        title: 'Lista Biblioteca',
        link: '/pages/biblioteca/list-biblioteca',
        key: 'lista_biblioteca',
      },
    ],
  },
]
