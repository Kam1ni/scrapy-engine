const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry:{
		main:"./src/main.ts",
		sample:"./src/sample/sample.ts"
	},
	devtool: "source-map",
	module:{
		rules:[
			{
				test:/\.(glsl|obj|mtl)$/i,
				use:"raw-loader"
			},
			{
				test:/\.tsx?$/,
				use:"ts-loader",
				exclude: /node_modules/
			},
			{
				test:/\.(png|jpe?g|gif)$/i,
				loader:'file-loader',
				options:{
					name:"[path][name].[ext]"
				}
			}
		]
	},
	resolve:{
		extensions:[".tsx", ".ts", ".js"],
		alias:{
			assets: path.resolve(__dirname, "src/assets"),
			"@":path.resolve(__dirname, "src")
		}
	},
	output:{
		filename:"[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	devServer:{
		contentBase:path.join(__dirname, "dist"),
		compress:true,
		port:8080,
		writeToDisk:true
	},
	plugins:[
		new CopyPlugin([
			{from:path.resolve(__dirname, "public"), to:path.resolve(__dirname, "dist")}
		])
	]
}