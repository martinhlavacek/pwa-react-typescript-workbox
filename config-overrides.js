
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { override, addLessLoader, disableEsLint, addBabelPlugins } = require('customize-cra')
// const rewireLess = require('react-app-rewire-less');
const rewireTypescript = require('react-app-rewire-typescript');

// module.exports = rewireLess.withLoaderOptions({javascriptEnabled: true});

module.exports = function override(config, env) {
    // ...
    config = rewireTypescript(config, env);
    
    
    config.plugins = config.plugins.map((plugin) => {
        if (plugin.constructor.name === 'GenerateSW') {
          return new WorkboxWebpackPlugin.InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'service-worker.js',
          });
        }
    
        return plugin;
      });
    
      return config;
}

module.exports = override(
    addLessLoader()
);
