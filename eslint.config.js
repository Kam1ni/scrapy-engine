const typescriptObj = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = {
	rules: {
		indent: ["error", "tab"],
		semi: ["error", "always"],
		quotes: ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}],
		"no-irregular-whitespace": ["error", {skipStrings: true}],
		"no-return-await": ["warn"],
		"no-lonely-if": ["warn"],
		"no-dupe-else-if": ["warn"],
		"no-else-return": ["warn"],
		"brace-style": ["error", "1tbs"],
		"object-shorthand": ["error"],
		"no-trailing-spaces": ["error"],
		"max-classes-per-file": ["error", 1],
		"no-cond-assign": ["error"],
		"prefer-spread": ["warn"],
		"key-spacing": ["warn", {
			beforeColon: false,
			afterColon: true,
			mode: "strict"
		}],
		"no-unused-vars":"off",
		"@typescript-eslint/no-unused-vars":[
			"warn", 
			{
				"argsIgnorePattern":".*",
				"caughtErrorsIgnorePattern":".*",
				"varsIgnorePattern": "^_",
			}
		]
	},
	languageOptions:{
		parser:typescriptParser,
		parserOptions: {
			projectService:true,
			sourceType:"module",
		},
	},
	plugins: {
		"@typescript-eslint":typescriptObj
	},
	ignores:[
		"node_modules/*",
		"dist/*"
	],
	files:[
		"src/**/*.ts",
	]
};
