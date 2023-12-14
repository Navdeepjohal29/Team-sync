  const HtmlWebPackPlugin = require("html-webpack-plugin");
  const ModuleFederationPlugin=  require('webpack/lib/container/ModuleFederationPlugin');

  const deps = require("./package.json").dependencies;
  module.exports = (_, argv) => ({
    output: {
      publicPath: "http://localhost:8080/",
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      
    },

    devServer: {
      port: 8080,
      historyApiFallback: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime']
          }
          },
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        },
        
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "container",
        remotes: {
          team: "team@http://localhost:8081/remoteEntry.js",
        },
       
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
      
    
    ],
  });
