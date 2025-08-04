import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    indent: 2,
    quotes: "double",
    semi: true,
    trailingComma: null,
  },
  typescript: true,
  vue: true,
}, {
  rules: {
    "no-multiple-empty-lines": "error",
    "node/prefer-global/process": "off",
    "style/brace-style": ["warn", "1tbs", { allowSingleLine: true }],
    "vue/no-v-for-template-key": "off",
    "vue/block-order": ["error", {
      order: ["script", "template", "style"],
    }],
    "vue/no-template-shadow": "off",

    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/multi-word-component-names": "off",
    "symbol-description": "off",
    "regexp/no-obscure-range": "off",
    "yaml/plain-scalar": "off",
  },
});
