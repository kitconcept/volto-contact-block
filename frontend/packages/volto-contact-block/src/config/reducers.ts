import type { ConfigType } from '@plone/registry';
import contactform from '../reducers';

export default function install(config: ConfigType) {
  config.addonReducers = {
    ...config.addonReducers,
    ...contactform,
  };

  return config;
}
