
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
    "template-curly-spacing": ["error", "never"],
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
  },
  "globals": {
    "bitmelo": "readonly",
    "EDITOR_VERSION": "readonly",
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack.config.common.js"
      }
    }
  }

}
