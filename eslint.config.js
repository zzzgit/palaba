import js from 'eslint-config-janus/js.js'
import mocha from 'eslint-config-janus/mocha.js'
import { jsify } from 'eslint-config-janus/utils.js'
import react from 'eslint-config-janus/react.js'
import globals from 'globals'

const testGlob = 'test/**/*.js'
const testTsArr = jsify(mocha, { files: [testGlob] })

export default [
	...js,
	...react,
	...testTsArr,
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
			'@stylistic/js/no-extra-parens': [2, 'all', { ignoreJSX: 'all' }],
			'react/destructuring-assignment': [2, 'always', { ignoreClassFields: true }],
			'react/prop-types': [2, { skipUndeclared: true }],
		},
	},
]
