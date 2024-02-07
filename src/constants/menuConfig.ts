import BarChartIcon from '../icons/BarChartIcon';
import BoxIcon from '../icons/BoxIcon';
import SendIcon from '../icons/SendIcon';
import SettingsIcon from '../icons/SettingsIcon';

const menuItems = [
  {
    i: 0,
    name: 'Boxes',
    colorLight: '#ffcc57', // Jaune orangé plus clair
    colorDark: '#ffc01f', // Utiliser la couleur foncée actuelle
    plusTard: '#ffd75a', // Jaune orangé plus clair
    path: '/boxes',
    icon: BoxIcon,
  },
  {
    i: 1,
    name: 'Stats',
    colorLight: '#4fd9c9', // Turquoise plus clair
    colorDark: '#17c8b3', // Utiliser la couleur foncée actuelle
    plusTard: '#4fded1', // Turquoise plus clair
    path: '/stats',
    icon: BarChartIcon,
  },
  {
    i: 2,
    name: 'Parameters',
    colorLight: '#8f9bff', // Bleu plus clair
    colorDark: '#6881ff', // Utiliser la couleur foncée actuelle
    plusTard: '#8fa4ff', // Bleu plus clair
    path: '/parameters',
    icon: SettingsIcon,
  },
  {
    i: 3,
    name: 'Contact',
    colorLight: '#b668ff', // Violet plus clair
    colorDark: '#a028ff', // Utiliser la couleur foncée actuelle
    plusTard: '#c054ff', // Violet plus clair
    path: '/contact',
    icon: SendIcon,
  },
];

export default menuItems;
