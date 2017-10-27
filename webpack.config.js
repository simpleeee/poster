const path=require("path")
const webpack=require('webpack')
const HtmlWebpackPlugin=require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const html = require('html-withimg-loader!./index.html');
module.exports={
    devtool:"eval-source-map",//生产阶段关闭这个选项
    entry:{
        app:__dirname+"/src/main.js"
    },
    output:{
        path:__dirname+"/dist",
        filename:"js/common.js"
    },
    devServer:{
        // host: '0.0.0.0',
        // port: 8080,
        contentBase:'./dist',
        historyApiFallback:true, //不跳转
        inline:true //实时刷新
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),//自动清理
        new HtmlWebpackPlugin({
            template:'html-withimg-loader!' +path.resolve(__dirname, './index.html'),
            // template: __dirname+"/index.html",
            inject:'body',//script位置
            hash:true,//每次生成不同哈希值
            chunks:['app']
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),//分配id
        new webpack.optimize.UglifyJsPlugin(),//压缩
        // new ExtractTextPlugin("./css/style.css")//分离
        new ExtractTextPlugin("style.css")//分离
        // new HtmlWebpackPlugin.HotModuleReplacementPlugin()//热加载插件
        
    ],
    module:{
        rules:[{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
            },
            exclude: /node_modules/
        },
        {
            test:/\.css$/,
            // use:[
            //     'style-loader',
            //     { loader: 'css-loader', options: { importLoaders: 1 } },
            // ]
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true // css压缩
                        }
                    }
                ],
                
            })
        },
        {
            test:/\.less$/,
            use:[
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 1,minimize: true} },
                'less-loader'
                ]
        },
        {
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: 'file-loader?name=img/[name].[ext]'
            }
    ]
    }
}