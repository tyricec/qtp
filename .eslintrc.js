module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "jest"
    ],
    "rules": {
        "comma-dangle": ["error", "always"],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
