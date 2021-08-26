module.exports = {
  extends: ["eslint:recommended", "plugin:node/recommended", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions:{
    requireConfigFile : false
  },
  rules: {
    "no-console": "off",
    "node/exports-style": ["error", "module.exports"],
    "node/file-extension-in-import": ["error", "always"],
    "node/prefer-global/buffer": ["error", "always"],
    "node/prefer-global/console": ["error", "always"],
    "node/prefer-global/process": ["error", "always"],
    "node/prefer-global/url-search-params": ["error", "always"],
    "node/prefer-global/url": ["error", "always"],
    "node/prefer-promises/dns": "error",
    "node/prefer-promises/fs": "error"
  },
  env: {
    jest: true,
  },
};
