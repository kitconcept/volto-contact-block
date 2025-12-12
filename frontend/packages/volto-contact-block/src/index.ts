import type { ConfigType } from '@plone/registry';
import type { BlockConfigBase } from '@plone/types';
import installSettings from './config/settings';
import installReducer from './config/reducers';
import blockConfig from './components';

declare module '@plone/types' {
  export interface BlocksConfigData {
    contactList: BlockConfigBase;
  }
}

function applyConfig(config: ConfigType) {
  installSettings(config);
  installReducer(config);
  config.blocks.blocksConfig.contactList = blockConfig;

  return config;
}

export default applyConfig;
