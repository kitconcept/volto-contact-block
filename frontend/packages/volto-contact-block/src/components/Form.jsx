import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import {
  Form as AriaForm,
  Button,
  TextField,
  Input,
  TextArea,
  Checkbox,
  Label,
  Select,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
} from 'react-aria-components';
import {
  getContactFormTicket,
  submitContactForm,
  resetContactForm,
} from '../actions';
import ContactDetail from './Detail';

const messages = defineMessages({
  Salutation: {
    id: 'Salutation',
    defaultMessage: 'Salutation',
  },
  Divers: {
    id: 'Divers',
    defaultMessage: 'Divers',
  },
  Mrs: {
    id: 'Mrs',
    defaultMessage: 'Mrs',
  },
  Mr: {
    id: 'Mr',
    defaultMessage: 'Mr',
  },
  YourName: {
    id: 'YourName',
    defaultMessage: 'Your Name *',
  },
  YourEmail: {
    id: 'YourEmail',
    defaultMessage: 'Your E-mail *',
  },
  Subject: {
    id: 'ContactFormSubject',
    defaultMessage: 'Subject of Your Message *',
  },
  Message: {
    id: 'ContactFormMessage',
    defaultMessage: 'Your Message to Us (max. 1000 characters) *',
  },
  DataProtection: {
    id: 'In order to provide you with this service, we store the data you enter. It will be used for this purpose only. It will not be passed on to third parties. The data will be deleted as soon as it is no longer required to achieve the intended purpose. The legal basis for processing the data, if the user has given their consent, is Art. 6 (1) (a) GDPR. The legal basis for processing data transmitted when sending an email is Art. 6 (1) (f) GDPR. If the contact is aimed at concluding a contract, the additional legal basis for processing is Art. 6 (1) (b) GDPR. Data protection information.',
    defaultMessage:
      'In order to provide you with this service, we store the data you enter. It will be used for this purpose only. It will not be passed on to third parties. The data will be deleted as soon as it is no longer required to achieve the intended purpose. The legal basis for processing the data, if the user has given their consent, is Art. 6 (1) (a) GDPR. The legal basis for processing data transmitted when sending an email is Art. 6 (1) (f) GDPR. If the contact is aimed at concluding a contract, the additional legal basis for processing is Art. 6 (1) (b) GDPR. Data protection information.',
  },
  PrivacyConsent: {
    id: 'I have read the data protection regulations carefully, I have understood the procedure described and hereby consent to the processing of my data for the purpose of contacting me.',
    defaultMessage:
      'I have read the data protection regulations carefully, I have understood the procedure described and hereby consent to the processing of my data for the purpose of contacting me.',
  },
  AgeConsent: {
    id: 'Our services are primarily aimed at individuals who have reached the age of 16. Individuals under the age of 16 may not transmit any personal data to us without the consent of their parents or guardians.',
    defaultMessage:
      'Our services are primarily aimed at individuals who have reached the age of 16. Individuals under the age of 16 may not transmit any personal data to us without the consent of their parents or guardians.',
  },
  SendMessage: {
    id: 'Send Message',
    defaultMessage: 'Send Message',
  },
  Cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  CloseWindow: {
    id: 'CloseWindow',
    defaultMessage: 'Close Window',
  },
  Error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  SecurityHeading: {
    id: 'Security measure: Please confirm that you are human',
    defaultMessage: 'Security measure: Please confirm that you are human',
  },
  SecurityIntro: {
    id: 'This captcha is a security measure to help prevent spam and abuse. Please enter the requested information in the field below the captcha image to confirm you are not a robot. Thank you for your help!',
    defaultMessage:
      'This captcha is a security measure to help prevent spam and abuse. Please enter the requested information in the field below the captcha image to confirm you are not a robot. Thank you for your help!',
  },
  SecurityLabel: {
    id: 'Please enter the letters from the CAPTCHA image here:',
    defaultMessage: 'Please enter the letters from the CAPTCHA image here:',
  },
  CaptchaPlaceholder: {
    id: 'CAPTCHA-Letters',
    defaultMessage: 'CAPTCHA-Letters',
  },
});

const ContactForm = (props) => {
  const intl = useIntl();
  const { contact, context } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    // Get form ticket after component is mounted
    dispatch(getContactFormTicket(contact['@id']));
    // Reset state when component is unmounted
    return () => dispatch(resetContactForm());
  }, [contact, dispatch]);

  const { ticket, loading, loaded, serverError, lang } = useSelector(
    (state) => ({
      ticket: state.contactform.ticket,
      loading: state.contactform.loading,
      loaded: state.contactform.loaded,
      serverError: state.contactform.error,
      lang: state.intl.locale,
    }),
  );

  const [error, setError] = React.useState({});
  const [state, setState] = React.useState({
    salutation: '',
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy_consent: false,
    age_consent: false,
    captcha: '',
  });
  const onChangeHandler = (event, data) => {
    if (data.name === 'privacy_consent' || data.name === 'age_consent') {
      setState({ ...state, [data.name]: !state[data.name] });
      setError({ ...error, [data.name]: false });
      return;
    }
    setState({
      ...state,
      [data.name]: data.value,
    });
  };

  const onSubmitHandler = (event) => {
    console.log('onSubmitHandler state:', state);
    event.preventDefault();

    if (!state.privacy_consent) {
      setError((error) => {
        return { ...error, privacy_consent: true };
      });
      return true;
    }
    if (!state.age_consent) {
      setError((error) => {
        return { ...error, age_consent: true };
      });
      return true;
    }

    dispatch(
      submitContactForm(contact['@id'], {
        ticket: ticket,
        subject: state.subject,
        message: state.message,
        salutation: state.salutation,
        name: state.name,
        email: state.email,
        origin: context['@id'],
        captcha: state.captcha,
      }),
    );
  };

  const salutationOptions = [
    { value: 'Frau', text: intl.formatMessage(messages.Mrs) },
    { value: 'Herr', text: intl.formatMessage(messages.Mr) },
  ];
  if (lang === 'de') {
    salutationOptions.unshift({
      value: 'Divers',
      text: intl.formatMessage(messages.Divers),
    });
  } else {
    salutationOptions.unshift({
      value: '',
      text: ' ',
    });
  }

  const closeButton = (
    <button
      type="button"
      className="contact-form-close-button"
      onClick={props.onCancel}
      aria-label={intl.formatMessage(messages.CloseWindow)}
    >
      ×
    </button>
  );

  return (
    <div className="contact-form-container">
      {closeButton}
      {loaded ? (
        <div className="contact-form">
          <fieldset>
            <legend className="sent">
              <FormattedMessage
                id="MessageSent"
                defaultMessage='Your message has been successfully delivered to "{name}"'
                values={{
                  name:
                    contact.title ||
                    `${contact.first_name || ''} ${contact.last_name || ''}`.trim(),
                }}
              />
            </legend>
            <p>
              <FormattedMessage
                id="MessageSentDetails"
                defaultMessage="Usually staff will get back to you within 2-3 business days. Please note that for security reasons we will not send you a confirmation email. In urgent cases regarding this issue, please call xxxx xxx xxx"
              />
            </p>
            <p>
              <FormattedMessage
                id="MessageSentThanks"
                defaultMessage="Thank you for contacting us."
              />
            </p>
            <Button onClick={() => props.onCancel()}>
              {intl.formatMessage(messages.CloseWindow)}
            </Button>
          </fieldset>
        </div>
      ) : (
        <AriaForm className="contact-form-overlay" onSubmit={onSubmitHandler}>
          <h2 id="heading">
            <FormattedMessage
              id="ContactFormHeader"
              defaultMessage="Contact: Write a Message"
            />
          </h2>
          <fieldset>
            <legend className="message">
              <FormattedMessage
                id="ContactFormTitle"
                defaultMessage={'Your Message about "{title}"'}
                values={{ title: context.title }}
              />
            </legend>
            <TextField name="subject" className="field" isRequired>
              <Input
                aria-label={intl.formatMessage(messages.Subject)}
                name="subject"
                value={state.subject}
                onChange={(e) =>
                  onChangeHandler(e, { name: 'subject', value: e.target.value })
                }
                placeholder={intl.formatMessage(messages.Subject)}
                type="text"
                maxLength={100}
              />
            </TextField>
            <TextField name="message" className="field" isRequired>
              <TextArea
                id="message"
                aria-label={intl.formatMessage(messages.Message)}
                name="message"
                value={state.message}
                onChange={(e) =>
                  onChangeHandler(e, { name: 'message', value: e.target.value })
                }
                placeholder={intl.formatMessage(messages.Message)}
                maxLength={1000}
              />
            </TextField>
          </fieldset>
          <fieldset>
            <legend>
              <FormattedMessage
                id="Your Contact Info"
                defaultMessage="Your Contact Info"
              />
            </legend>
            <div className="fields-row">
              <div className="field">
                <Label
                  className="label"
                  aria-label={intl.formatMessage(messages.Salutation)}
                >
                  {intl.formatMessage(messages.Salutation)}
                </Label>
                <Select
                  selectedKey={state.salutation}
                  onSelectionChange={(key) =>
                    onChangeHandler(null, {
                      name: 'salutation',
                      value: String(key),
                    })
                  }
                  aria-label={intl.formatMessage(messages.Salutation)}
                  className="dropdown"
                >
                  <Button className="button-secondary" variant="secondary">
                    <SelectValue
                      defaultChildren={intl.formatMessage(messages.Salutation)}
                    />
                  </Button>
                  <Popover>
                    <ListBox>
                      {salutationOptions.map((opt) => (
                        <ListBoxItem id={opt.value} key={opt.value}>
                          {opt.text}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                </Select>
              </div>
              <TextField name="name" className="field">
                <Input
                  id="name"
                  name="name"
                  value={state.name}
                  onChange={(e) =>
                    onChangeHandler(e, { name: 'name', value: e.target.value })
                  }
                  placeholder={intl.formatMessage(messages.YourName)}
                  type="text"
                  maxLength={100}
                />
              </TextField>
            </div>
            <TextField name="email" className="field" isRequired>
              <Input
                id="email"
                name="email"
                value={state.email}
                onChange={(e) =>
                  onChangeHandler(e, { name: 'email', value: e.target.value })
                }
                placeholder={intl.formatMessage(messages.YourEmail)}
                type="email"
                maxLength={100}
              />
            </TextField>
            <p className="note">
              <FormattedMessage
                id="Mandatory"
                defaultMessage="Note: Required information is marked with a *"
              />
            </p>
          </fieldset>
          <hr />
          <fieldset>
            <legend>
              <FormattedMessage
                id="Addressee"
                defaultMessage="Your Message is Addressed to"
              />
            </legend>
            <div className="contact-detail">
              <ContactDetail contact={contact} />
            </div>
          </fieldset>
          <hr />
          <fieldset>
            <legend>
              <FormattedMessage
                id="Our Data Safety Rules"
                defaultMessage="Our Data Safety Rules"
              />
            </legend>
            <p>
              {intl.formatMessage(messages.DataProtection)}{' '}
              <a href="/" target="_blank" rel="noreferrer">
                <FormattedMessage
                  id="PrivacyPolicy"
                  defaultMessage="Privacy Policy"
                />
              </a>
            </p>
            <div className="field">
              <Checkbox
                isSelected={state.privacy_consent}
                onChange={() =>
                  onChangeHandler(null, { name: 'privacy_consent' })
                }
                aria-labelledby="privacy-consent-label"
                className="privacy-checkbox"
              >
                <span
                  className={`checkbox-box privacy_consent ${state.privacy_consent ? 'checked' : ''}`}
                ></span>
                <label id="privacy-consent-label" className="checkbox-label">
                  {intl.formatMessage(messages.PrivacyConsent) + ' *'}
                </label>
              </Checkbox>

              {error.privacy_consent && <div className="error-label">*</div>}
            </div>
            <div className="field">
              <Checkbox
                isSelected={state.age_consent}
                onChange={() => onChangeHandler(null, { name: 'age_consent' })}
                aria-labelledby="age-consent-label"
                className="privacy-checkbox"
              >
                <span
                  className={`checkbox-box age_consent ${state.age_consent ? 'checked' : ''}`}
                ></span>
                <label id="age-consent-label">
                  {intl.formatMessage(messages.AgeConsent) + ' *'}
                </label>
              </Checkbox>
              {error.age_consent && <div className="error-label">*</div>}
            </div>
          </fieldset>
          {/* // ###captcha */}

          <hr />
          <fieldset>
            {/* {serverError && (
              <div className="error-message">
                <div className="error-header">
                  {intl.formatMessage(messages.Error)}
                </div>
                <p>{serverError.response.body.message}</p>
              </div>
            )} */}
            <Button
              className={`submit-button${loading ? ' loading' : ''}`}
              name="submit"
              type="submit"
            >
              {intl.formatMessage(messages.SendMessage)}
            </Button>
            <Button
              className="cancel-button"
              name="cancel"
              onClick={props.onCancel}
            >
              {intl.formatMessage(messages.Cancel)}
            </Button>
          </fieldset>
        </AriaForm>
      )}
    </div>
  );
};

export default ContactForm;
