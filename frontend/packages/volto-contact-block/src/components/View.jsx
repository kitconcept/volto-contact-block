import React from 'react';
import { Heading } from 'react-aria-components';
import { defineMessages, useIntl } from 'react-intl';
import ContactBody from './Body';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

const messages = defineMessages({
  PleaseChooseContact: {
    id: 'Please choose an existing contact as source for this element',
    defaultMessage:
      'Please choose an existing contact as source for this element',
  },
});

const ContactListView = (props) => {
  const { data, content, isEditMode } = props;
  const intl = useIntl();

  const showEmptyMessage =
    !data.hrefList || data.hrefList?.length === 0 || !data.hrefList[0]?.href;

  return (
    <div className="block contact-list">
      <div className="block-container">
        {showEmptyMessage && isEditMode && (
          <div className="ui message">
            <div className="teaser-item default">
              <p>{intl.formatMessage(messages.PleaseChooseContact)}</p>
            </div>
          </div>
        )}

        {data.hrefList?.length > 0 && data.hrefList[0]?.href && (
          <>
            {data.headline && (
              <Heading level={2} className="headline">
                {data.headline}
              </Heading>
            )}

            <div className="ui two column grid">
              <div className="row">
                {data.hrefList.map((item, index) => (
                  <div className="column" key={index}>
                    <ContactBody
                      key={item.id}
                      data={item}
                      isEditMode={isEditMode}
                      content={content}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withBlockExtensions(ContactListView);
