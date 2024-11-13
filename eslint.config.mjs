import {
	fixupConfigRules,
	fixupPluginRules,
	includeIgnoreFile,
} from '@eslint/compat'
import eslintConfigPrettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
})
const gitignorePath = path.resolve(__dirname, '.gitignore')

export default [
	eslintConfigPrettier,
	includeIgnoreFile(gitignorePath),
	...fixupConfigRules(
		compat.extends(
			'plugin:react/recommended',
			'plugin:react-hooks/recommended',
			'eslint:recommended',
		),
		...compat.env({
			es2022: true,
			node: true,
		}),
	),
	{
		ignores: ['*.config.js'],
	},
	// general rules
	{
		plugins: {
			'react': fixupPluginRules(react),
			'react-hooks': fixupPluginRules(reactHooks),
		},

		files: ['**/*.{js,ts,jsx,tsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parser: tsParser,
			parserOptions: {
				project: 'tsconfig.json',
			},
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'indent': ['error', 'tab'],
		},
	},
]
