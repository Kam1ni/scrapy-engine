const path = require("path");

module.exports = {
	entry:{
		main:"./src/main.ts",
		sample:"./src/sample/sample.ts"
	},
	devtool: "source-map",
	module:{
		rules:[
			{
				test:/\.glsl$/i,
				use:"raw-loader"
			},
			{
				test:/\.tsx?$/,
				use:"ts-loader",
				exclude: /node_modules/
			},
			{
				test:/\.(png|jpe?g|gif)$/i,
				use:[
					{
						loader:'file-loader'
					}
				]
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
		library:"ex",
		libraryTarget:"umd"
	},
	devServer:{
		contentBase:path.join(__dirname, "dist"),
		compress:true,
		port:8080,
	},
}