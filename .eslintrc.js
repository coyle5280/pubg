module.exports = {
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "globals": {
        "Ext": true,
        "moment": true
    },
    "plugins": ["promise"],
    "rules": {
        "comma-dangle": "error",
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "eqeqeq": "error",
        "no-debugger": "error",
        "quotes": ["error", "single"],
        "sort-keys": "error"
    },
    "env": {
        "node": true,
        "es6": true
    }
}