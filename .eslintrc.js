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
        "Ext": true
    },
    "plugins": ["promise"],
    "rules": {
        "comma-dangle": "error",
        "indent": "error",
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