var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
      javascript: './client/js/app.js',
      html: './client/index.html'
    },
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /.css$/, loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
}


