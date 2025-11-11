import type { ConfigType } from '@plone/registry';
import emailSVG from '@plone/volto/icons/email.svg';
import ContactListView from '../components/View';
import ContactListEdit from '../components/Edit';
import '../theme/contactForm-base.css';

export default function install(config: ConfigType) {
  config.blocks.blocksConfig.contactList = {
    id: 'contactList',
    title: 'Contact list',
    icon: emailSVG,
    group: 'common',
    view: ContactListView,
    edit: ContactListEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };
  return config;
}
