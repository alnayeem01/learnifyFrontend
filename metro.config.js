const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const baseConfig = getDefaultConfig(__dirname);

const customConfig = {
  // Add any other custom config here if needed in future
};

const mergedConfig = mergeConfig(baseConfig, customConfig);

module.exports = wrapWithReanimatedMetroConfig(mergedConfig);