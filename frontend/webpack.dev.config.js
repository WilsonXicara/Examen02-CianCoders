const path = require('path');

module.exports = {
  entry: {
    'app': path.resolve(__dirname, 'src/entries/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
    proxy: [{
      path: '/api/v1/',
      target: 'http://127.0.0.1:8000/',
      secure: false,
      changeOrigin: true
    }],
  },
  // Esta configuración permite darle seguimiento detallado de en dónde surgen los errores
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            // 'es2015' es ECMAScript 6
            // 'stage-2' permite utilizar las nuevas características
            presets: ['es2015', 'react', 'stage-2'],
          }
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]',
          }
        }
      },
    ]
  },
  // Agregando alias para el uso de las peticiones HTTP
  resolve: {
    alias: {
        api$: path.resolve(__dirname, 'src/utils/api.js'),
    },
  },
}