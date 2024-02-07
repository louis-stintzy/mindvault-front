import BarChartIcon from '../icons/BarChartIcon';
import BoxIcon from '../icons/BoxIcon';
import SendIcon from '../icons/SendIcon';
import SettingsIcon from '../icons/SettingsIcon';

const menuItems = [
  {
    i: 0,
    name: 'Boxes',
    color: '#5B8AC6',
    path: '/boxes',
    icon: BoxIcon,
  },
  {
    i: 1,
    name: 'Stats',
    color: '#F9D77E',
    path: '/stats',
    icon: BarChartIcon,
  },
  {
    i: 2,
    name: 'Parameters',
    color: '#FFAD42',
    path: '/parameters',
    icon: SettingsIcon,
  },
  {
    i: 3,
    name: 'Contact',
    color: '#AEB6BF',
    path: '/contact',
    icon: SendIcon,
  },
];

export default menuItems;
