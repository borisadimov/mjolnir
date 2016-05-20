/* eslint strict: 0, no-console: 0 */
'use strict';

var targetDir = '/Users/flywithme/Developer/mjolnir/frontend'

const path = require('path');
const express = require('express');
const webpack = require('webpack');
var jade = require('jade');

const livereload = require('express-livereload')

const config = require('./webpack_config/webpack.base.js')(targetDir);

const app = express();
livereload(app, {})

const compiler = webpack(config);

var port = process.env.PORT || 3000;

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  var render = jade.compileFile(path.join(targetDir, '/app/templates/index.jade'));
  var html = render();
  res.setHeader('Content-Type', 'text/html');
  res.end(html);


});


app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});


