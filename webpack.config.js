var webpack = require('webpack')

module.exports = {
  entry: {
    firstComponent: './src/js/firstComp/index.js'
  },
  output: { filepath: '[name].js',
              path: path.resolve(__dirname,
                'public/js/componets')},
  module: {
    rules: [
      {
        test: /\.js$,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'es2015', { modules: fales}]
          ]
        }
      }
    ]
  }
}