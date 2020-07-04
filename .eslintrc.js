module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es2020': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 11
    },
    'rules': {
		'dot-location': [
			'error',
			'property'
		],
        'indent': [
            'error',
			4,
			{ 'MemberExpression': 0, 'VariableDeclarator': 'first' }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}
