/**
 * contactform actions.
 * @module actions/contactform/contactform
 */

import { flattenToAppURL } from '@plone/volto/helpers';

export const CONTACTFORM_TICKET = 'CONTACTFORM_TICKET';
export const CONTACTFORM_SUBMIT = 'CONTACTFORM_SUBMIT';
export const CONTACTFORM_RESET = 'CONTACTFORM_RESET';

/**
 * Get contact form ticket
 * @function getContactFormTicket
 * @param {string} contactPath Contact path.
 * @returns {Object} Action.
 */
export function getContactFormTicket(contactPath) {
  return {
    type: CONTACTFORM_TICKET,
    request: {
      op: 'get',
      path: `${flattenToAppURL(contactPath)}/@contact-form`,
    },
  };
}

export function submitContactForm(contactPath, data) {
  return {
    type: CONTACTFORM_SUBMIT,
    request: {
      op: 'post',
      path: `${flattenToAppURL(contactPath)}/@contact-form`,
      data,
    },
  };
}

export function resetContactForm() {
  return {
    type: CONTACTFORM_RESET,
  };
}
