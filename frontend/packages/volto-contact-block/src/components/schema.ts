import { defineMessages } from 'react-intl';
import type { BlockEditProps } from '@plone/types';
import type { IntlShape } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  contactList: {
    id: 'Contacts List',
    defaultMessage: 'Contacts List',
  },
  item: {
    id: 'Contact',
    defaultMessage: 'Contact',
  },
  items: {
    id: 'Items',
    defaultMessage: 'Items',
  },
  addItem: {
    id: 'Add Contact',
    defaultMessage: 'Add Contact',
  },
  headline: {
    id: 'Headline',
    defaultMessage: 'Headline',
  },
});

const itemSchema = ({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) => {
  return {
    title: intl.formatMessage(messages.item),
    addMessage: intl.formatMessage(messages.addItem),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href'],
      },
    ],

    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser',
        mode: 'link',
        allowExternals: false,
      },
    },
    required: [],
  };
};

export const ContactListSchema = ({
  props,
  intl,
}: {
  props: BlockEditProps;
  intl: IntlShape;
}) => {
  return {
    title: intl.formatMessage(messages.contactList),
    block: 'contactList',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['headline', 'hrefList'],
      },
    ],

    properties: {
      headline: {
        title: intl.formatMessage(messages.headline),
      },
      hrefList: {
        widget: 'object_list',
        title: intl.formatMessage(messages.items),
        schema: itemSchema({ props, intl }),
      },
    },
    required: [],
  };
};
