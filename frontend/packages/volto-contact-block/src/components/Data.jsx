import React from 'react';
import PropTypes from 'prop-types';
import { BlockDataForm } from '@plone/volto/components';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { ContactListSchema } from './schema';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { getContent } from '@plone/volto/actions';
import {
  difference,
  replaceItemOfArray,
  usePrevious,
} from '@plone/volto/helpers';

const ContactListData = (props) => {
  const { block, data, onChangeBlock } = props;
  const { hrefList } = props.data;
  const dispatch = useDispatch();
  const previous = usePrevious(hrefList);
  const intl = useIntl();
  const schema = ContactListSchema({ ...props, intl });

  React.useEffect(() => {
    if (previous) {
      const diff = difference(hrefList, previous);
      const index = diff.findIndex((val) => val);
      const href = diff[index]?.href?.[0]?.['@id'];
      if (href) {
        dispatch(getContent(href, null, block)).then((resp) => {
          const itemData = { '@id': href };
          [
            'title',
            'first_name',
            'last_name',
            'job_title',
            'contact_email',
            'contact_phone',
            'contact_building',
            'contact_room',
            'description',
          ].map((n) => (itemData[n] = resp[n]));
          itemData['has_email'] = Boolean(resp['contact_email']);
          onChangeBlock(block, {
            ...data,
            hrefList: replaceItemOfArray(data.hrefList, index, {
              ...data.hrefList[index],
              href: [itemData],
            }),
          });
        });
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [hrefList]);

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      block={block}
    />
  );
};

ContactListData.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default withObjectBrowser(ContactListData);
