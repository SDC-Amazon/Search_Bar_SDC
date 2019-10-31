const path = require('path');
const SRC_DIR = path.join(__dirname, '/src/client');
const DIST_DIR = path.join(__dirname, '/dist');
module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
  filename: 'bundle.js',
  path: DIST_DIR
},
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
      }
    ]
  }
};
