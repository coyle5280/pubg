module.exports = {
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "globals": {
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