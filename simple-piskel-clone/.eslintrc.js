module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "jest/globals": true
  },
  "extends": [
      "airbnb/hooks",
      "airbnb/base",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "plugin:jest/recommended",
  ],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly",
      "require": true,
  },
  "parser": "babel-eslint",
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 8,
      "sourceType": "module"
  },
  "plugins": [
      "react",
      "prettier",
      "jest"
  ],
  "rules": {
      "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")],
      "semi": "warn",
      "no-console": "off",
      "no-plusplus": "off",
      "eol-last": "off",
      "indent": ["off", "tab", "error", 2],
      "comma-dangle": "off",
      "arrow-parens": "off",
      "no-constant-condition": ["error", { "checkLoops": false }],
      "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
  },
      "settings": {
         
          "react": {
              "createClass": "createReactClass",
              "pragma": "React", 
              "version": "16.0",
              "flowVersion": "0.53" 
          },
          "propWrapperFunctions": [
              "forbidExtraProps",
              {
                  "property": "freeze",
                  "object": "Object"
              },
              {
                  "property": "myFavoriteWrapper"
              }
          ],
          "linkComponents": [
              "Hyperlink",
              {
                  "name": "Link",
                  "linkAttribute": "to"
              }
          ]
      }
};