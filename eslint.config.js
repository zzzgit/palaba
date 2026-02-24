import js from 'eslint-config-janus/js.js'
import mocha from 'eslint-config-janus/mocha.js'
import { jsify } from 'eslint-config-janus/utils.js'
import solid from 'eslint-plugin-solid/configs/recommended'
import globals from 'globals'

const testGlob = 'test/**/*.js'
const testTsArr = jsify(mocha, { files: [testGlob] })

export default [
	...js,
	...testTsArr,
	solid,
	{
		languageOptions: {
			parserOptions: {
				sourceType: 'module',
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
				...globals.node,
			},
		},
		rules: {

		},
	},
]
