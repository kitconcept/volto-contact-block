import type { ConfigType } from '@plone/registry';
import installSettings from './config/settings';
import installReducer from './config/reducers'

function applyConfig(config: ConfigType) {
  installSettings(config);
  installReducer(config);

  return config;
}

export default applyConfig;
