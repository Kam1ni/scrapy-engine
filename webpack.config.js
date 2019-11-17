const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

let config = {
	entry:{
		main:"./src/main.ts",
	},
	devtool: "source-map",
	module:{
		rules:[
			{
				test:/\.tsx?$/,
				use:"ts-loader",
				exclude: /node_modules/
			},
			{
				test:/\.(glsl|obj|mtl)$/i,
				use:"raw-loader"
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
		library: 'atrium-react-plugin-beta',
		libraryTarget: 'commonjs2',
		path: path.resolve(__dirname, "dist"),
	},
	devServer:{
		contentBase:path.join(__dirname, "dist"),
		compress:true,
		port:8080,
		writeToDisk:true
	},
	target:"node"
}

module.exports = (env, argv) => {
	if (argv.mode == "development"){
		config.entry.sample = "./src/sample/sample.ts";
		config.plugins=[
			new CopyPlugin([
				{from:path.resolve(__dirname, "public"), to:path.resolve(__dirname, "dist")}
			])
		]
	}else{
		config.plugins = [
			new CleanWebpackPlugin()
		];
		config.module.rules[0].exclude = /(node_modules|src\/sample)/
	}
	
	return config;
}