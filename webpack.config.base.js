var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

var NODE_ENV = process.env.NODE_ENV;

var env = {
    production : NODE_ENV === 'production',
    staging : NODE_ENV === 'staging',
    test : NODE_ENV === 'test',
    development : NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
    build : (env.production || env.staging)
});

module.exports = {
    target : 'web',

    entry : [
        'babel-polyfill',
        './client/index'
    ],

    output : {
        path : path.join(process.cwd(), '/client'),
        pathinfo : true,
        publicPath : 'http://localhost:3000/client/',
        filename : 'main.js'
    },

    resolve : {
        modules : [
            "web_modules",
            "node_modules",
            path.resolve(__dirname, "client")
        ],
        extensions : ['.webpack.js', '.web.js', '.js', '.jsx']
    },

    plugins : [
        new webpack.DefinePlugin({
            __DEV__ : env.development,
            __STAGING__ : env.staging,
            __PRODUCTION__ : env.production,
            __CURRENT_ENV__ : '\'' + (NODE_ENV) + '\''
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: __dirname,
                postcss : function() {
                    return [autoprefixer, precss];
                }
            }
        })
    ],

    module : {
        rules : [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules',
                include: /flexboxgrid/
            },
            {
                test : /(\.scss)$/,
                loader : 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded'
            },
            {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                use: "url-loader?limit=100000"
            }
        ],
        noParse : /\.min\.js$/
    }
};
