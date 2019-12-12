const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = (env) => {
  const plugins = [
    new ExtractTextPlugin("css/[name].css")
  ]

  if (env.NODE_ENV === 'production') {
    plugins.push(
      new CleanWebpackPlugin(['dist'], {root: __dirname})
    )
  }

  return {

    entry: {
      'app': path.resolve(__dirname, 'src/pages/containers/app'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Se indica que el archivo del servidor se vaya a la carpeta del Server Side Render
      filename: 'ssr/[name].js',
      publicPath: "/",
      chunkFilename: 'js/[id].[chunkhash].js',
      // Carga de archivo que puede entender NodeJS
      libraryTarget: 'commonjs2',
    },
    devServer: {
      port: 9000,
    },
    // Por defecto es 'browser' y está oriendado al navegador
    target: 'node',
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
              presets: ['es2015', 'react', 'stage-2'],
            }
          },
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                }
              }
            ]
          })
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]',
            }
          }
        },
      ]
    },
    plugins
  }
}