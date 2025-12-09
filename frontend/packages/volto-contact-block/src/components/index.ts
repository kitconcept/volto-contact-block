import type { BlockConfigBase } from '@plone/types';
import emailSVG from '@plone/volto/icons/email.svg';
import { ContactListSchema } from './schema';
import ContactListView from '../components/View';
import ContactListEdit from '../components/Edit';

const blockConfig: BlockConfigBase = {
  id: 'contactList',
  title: 'Contact list',
  icon: emailSVG,
  group: 'common',
  view: ContactListView,
  edit: ContactListEdit,
  blockSchema: ContactListSchema,
  restricted: false,
  mostUsed: false,
  sidebarTab: 1,
};

export default blockConfig;
