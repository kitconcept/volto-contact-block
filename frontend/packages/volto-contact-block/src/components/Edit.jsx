import React from 'react';
import { v4 as uuid } from 'uuid';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import ContactListData from './Data';
import ContactListView from './View';

const ContactListEdit = (props) => {
  const { onChangeBlock, block, selected } = props;

  const data = {
    hrefList: [{ '@id': uuid() }],
    ...props.data,
  };

  return (
    <>
      <ContactListView {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <ContactListData
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default ContactListEdit;
