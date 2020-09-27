
module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
  "rules": {
    "no-underscore-dangle": "off",
    "space-in-parens": ["error", "always"],
    "no-bitwise": "off",
    "template-curly-spacing": ["error", "always"],
    "arrow-body-style": "off",
    "brace-style": ["error", "stroustrup"],
    "max-len": ["error", { "code": 120, "ignoreComments": true, "ignoreTrailingComments": true }],
    "operator-assignment": "off",
    "no-lonely-if": "off",
    "no-console": 'off',
    "react/jsx-filename-extension": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react/jsx-curly-spacing": ["error", {"when": "always"}],
    "react/prefer-stateless-function": "off",
    "arrow-parens": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "react/sort-comp": 'off',
    "no-else-return": 'off',
    "react/forbid-prop-types": "off",
    "no-continue": "off",
    "react/no-did-update-set-state": "off",
    "react/jsx-curly-brace-presence": "off",
    "prefer-destructuring": "off",
    "import/order": "off",
    "linebreak-style": 0,
    "react/jsx-one-expression-per-line": 0
  },
  "globals": {
    "bitmelo": "readonly",
    "EDITOR_VERSION": "readonly",
    "IS_DESKTOP": "readonly",
    "IS_DEV": "readonly"
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack.config.common.js"
      }
    }
  }

}
