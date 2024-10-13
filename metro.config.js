const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const defaulConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaulConfig.resolver;
const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};

module.exports = mergeConfig(defaulConfig, config);
