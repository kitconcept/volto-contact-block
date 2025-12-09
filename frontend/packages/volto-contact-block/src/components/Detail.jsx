import React from 'react';

const ContactDetail = (props) => {
  const item = props.contact;

  return item ? (
    <div className="contact-list-body">
      <h3 className="name">{item.title || ''}</h3>
      {item.job_title ? <div className="position">{item.job_title}</div> : ''}
      {item.contact_building ? (
        <div className="building">Building: {item.contact_building}</div>
      ) : (
        ''
      )}
      {item.contact_room ? (
        <div className="room">Room: {item.contact_room}</div>
      ) : (
        ''
      )}
      {item.description ? (
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: item.description,
          }}
        />
      ) : (
        ''
      )}
      {item.contact_phone ? (
        <div className="phone">Tel: {item.contact_phone}</div>
      ) : (
        ''
      )}
      {item.contact_email ? (
        <div className="email">Email: {item.contact_email}</div>
      ) : (
        ''
      )}
    </div>
  ) : (
    ''
  );
};

export default ContactDetail;
