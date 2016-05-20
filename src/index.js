var targetDir = '/Users/flywithme/Developer/mjolnir/frontend'


var path = require('path');
var webpack = require('webpack');

var createConfig = require('./webpack_config/webpack.base.js')

var buildConfig = createConfig(targetDir);

webpack(buildConfig, function(err, stats) {
  if(err) throw new gutil.PluginError("webpack:build", err);
  console.info("[webpack:build]", stats.toString({
    colors: true
  }));
});
