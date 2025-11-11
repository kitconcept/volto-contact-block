import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Modal, ModalOverlay, Dialog } from 'react-aria-components';
import ContactDetail from './Detail';
import ContactForm from './Form';

const messages = defineMessages({
  Contact: {
    id: 'contactButtonLabel',
    defaultMessage: 'Contact',
  },
});

const ContactBody = (props) => {
  const intl = useIntl();
  const contact =
    props.data.href?.length > 0 ? props.data.href?.[0] : props.data;
  const { content } = props;

  const [open, setOpen] = useState(false);

  return contact ? (
    <div className="contact-detail">
      <ContactDetail contact={contact} />
      {contact.has_email ? (
        <>
          <Button className="button" onPress={() => setOpen(true)}>
            {intl.formatMessage(messages.Contact)}
          </Button>
          <ModalOverlay
            className="contact-form-modal"
            isOpen={open}
            onOpenChange={setOpen}
            isDismissable
          >
            <Modal>
              <Dialog
                role="dialog"
                aria-labelledby="contact-form-modal-heading"
                className="scrolling"
              >
                <ContactForm
                  contact={contact}
                  context={content}
                  onCancel={() => setOpen(false)}
                />
              </Dialog>
            </Modal>
          </ModalOverlay>
        </>
      ) : null}
    </div>
  ) : (
    ''
  );
};

export default ContactBody;
