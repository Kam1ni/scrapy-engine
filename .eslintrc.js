module.exports = {
	root: true,
	env: {
		es6: true
	},
	rules: {
		indent: ["error", "tab"],
		semi: ["error", "always"],
		quotes: ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}],
		"no-irregular-whitespace": ["error", {skipStrings: true}],
		"max-len": ["warn", 180, {
			ignorePattern: "^import |^export"
		}],
		"max-lines": ["warn", 500],
		"max-lines-per-function": ["warn", 40],
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
		}]
	},
	parserOptions: {
		parser: "@typescript-eslint/parser"
	},
	plugins: [
		"@typescript-eslint"
	]
};
