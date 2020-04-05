const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
// 生成一个HTML5文件，可配置插入<link>、<script>资源文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取文本插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 由于webpack v4的extract-text-webpack-plugin不应该用于css，改为使用mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// vue-loader在15.*之后的版本需要导入vue-loader/lib/plugin插件，将定义的.js、.css规则应用到.vue文件中
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 合并插件
const merge = require('webpack-merge');
// 导入基本配置
var webpackBaseConfig = require('./webpack.config.js');
// 清空基本配置插件列表
webpackBaseConfig.plugins = [];

// 扩展webpackBaseConfig配置
module.exports = merge(webpackBaseConfig, {
	// webpack4默认不需要配置文件，可以通过mode选项为webpack指定一些默认的配置，mode分为development/production，默认为production
	mode:'production',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		// 将入口文件重命名为带有20位hash值的唯一文件，文件名唯一且立即生效
		filename: '[name].[hash].js',
		chunkFilename: 'js/[chunkhash:8].chunk.js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			// 提取css，并重命名为带有20位hash值的唯一文本
		    filename: 'css/[name].[hash].css',
		}),
		new ExtractTextPlugin({
			// 提取css，并重命名为带有20位hash值的唯一文本
			filename: 'css/[name].[hash].css', 
			// allChunks：当为false的时候，只会提取初始化的时候引入的css,当allChunks属性为true时，会把异步引入的css也提取出来
			allChunks: true
		}),
		// 定义当前node环境为生产环境
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		// 压缩js：webpack4已经升级不支持这种写法，也就是说不在plugins里面进行操作，而是放在了optimization里面
		/*new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),*/
		new VueLoaderPlugin(),
		// 通过webpack-pack命令打包可以在任意路径下生成文件，比如filename:'../index_prod.html'
		new HtmlWebpackPlugin({
			// 或者使用带有20位hash值的唯一文件index-[hash].html
            filename:'index.html',
            template: path.join(__dirname, './src/html/index.ejs'),
            inject: 'body',
            chunks: 'all'
		})
	],
	// 压缩js
	optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        drop_debugger: true,
                        drop_console: true,
                        // 移除console
                        pure_funcs: ['console.log']
                    },
                    warnings: false
                }
            })
        ]
    }
});
