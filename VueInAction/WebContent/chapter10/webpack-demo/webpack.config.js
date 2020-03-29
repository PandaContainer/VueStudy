const path = require('path');
// 生成一个HTML5文件，可配置插入<link>、<script>资源文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取文本插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 由于webpack v4的extract-text-webpack-plugin不应该用于css，改为使用mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// vue-loader在15.*之后的版本需要导入vue-loader/lib/plugin插件，将定义的.js、.css规则应用到.vue文件中
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 清除旧资源
// const CleanWebpackPlugin = require('clean-webpack-plugin');

// webpack自定义配置文件
// module.exports相当于export default config，由于当前没有安装支持ES6的编译插件，因此不能直接使用ES6的语法，否则编译报错
module.exports = {
	// 模式：development/production
	mode: 'development',
	// 1.入口（entry）的作用是告诉webpack从哪里开始寻找依赖，并且编译
	entry: {
		// key为chunk name，在打包窗口可查看到不同资源（包括引入的资源）文件所归属的chunk name
		index: './src/js/index.js',
		common: './src/js/common.js'
	},
	// 2.出口（output）用来配置编译后的文件存储位置和文件名，publicPath指定资源文件引用目录，可以填CDN网址，输出文件会存储在./demo/dist/main.js中
	output: {
		// 或使用：path: path.join(__dirname, './dist')
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		// [name]的意思是根据入口文件的名称，打包成相同的名称，有几个入口文件，就可以打包出几个文件。
		// 添加哈希值，防止缓存
		filename: '[name].js?[hash]'
	},
	// 3.加载器（loaders）：配置加载器对各种不同后缀文件进行处理，当webpack编译过程中遇到require()或import语句导入一个后缀文件时，
	// 先通过css-loader转换，再通过style-loader转换，然后继续打包，CSS是通过JavaScript动态创建<style>标签来写入的，
	// use选项可以是数组或字符串，如果是数组，则编译顺序从后往前
	// 4.插件（plugins）：功能强大且可以定制，通过extract-text-webpack-plugin插件把散落在各地的css提取出来，并生成一个main.css文件，
	// 最终在index.html中通过<link>的形式加载它
	module: {
		rules: [
			// .vue解析
			{
				test: /\.vue$/,
				loader: 'vue-loader'
				/*options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: 'css-loader',
							fallback: 'vue-style-loader'
							
						})
					}
				}*/
			},
			// ES6解析，它会应用到普通的 `.js`文件，以及 `.vue`文件中的 `<script>` 块
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				// 也可以通过.babelrc配置文件配置,优先级高于option
				options: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			},
			// css提取，它会应用到普通的 `.css` 文件，以及 `.vue` 文件中的 `<style>` 块
			{
				test: /\.css$/,
				/*use: [
					'style-loader',
					'css-loader'
				]*/
				use: [
				 	MiniCssExtractPlugin.loader,
					'css-loader'
				]
				/*use: ExtractTextPlugin.extract({
					// 这里表示不提取的时候，使用什么样的配置来处理css
					fallback: 'style-loader',
					// 指需要什么样的loader去编译文件
					use: 'css-loader'
				})*/
			}
		]
	},
	plugins: [
		// 注意传的参数是一个对象
		new HtmlWebpackPlugin({
			// 生成文件名
            /*filename:'index-[hash].html',*/
            // 传一个模板，使用根目录下的index.html
            template: path.join(__dirname, 'index.html'),
            // 默认true；是否将错误信息输出到html页面中。
            // 在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
            showErrors: true,
            // true或者body：所有JavaScript资源插入到body元素的底部，head: 所有JavaScript资源插入到head元素中，
            // false：所有静态资源css和JavaScript都不会注入到模板文件中
            inject: 'head',
            // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的chunk注入到模板中。
            // 在配置多个页面时，每个页面注入的chunk应该是不相同的，需要通过该配置为不同页面注入不同的chunk
            excludeChunks: ['common']
		}),
		// 配置多个html页面
		new HtmlWebpackPlugin({
            filename: './list/list.html',
            template: 'src/html/list.html',
            showErrors: true,
            inject:'true',
            hasg:'true',
            // 默认值字符串'all'
            chunks: ['common']
        }),
		// 重命名提取后的css文件
		new MiniCssExtractPlugin({
		      filename: 'css/style.css',
		}),
		new ExtractTextPlugin({
			// 生成文件的文件名，可以包含 [name], [id], [contenthash]
			filename: 'css/style.css', 
			// allChunks：当为false的时候，只会提取初始化的时候引入的css,当allChunks属性为true时，会把异步引入的css也提取出来
			allChunks: true
		}),
		 new VueLoaderPlugin()
	]
}
