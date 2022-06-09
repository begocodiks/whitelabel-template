const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const ENV = process.env.ENV || "dev";

const loadYaml = (p) =>
  yaml.safeload(fs.readFileSync(path.resolve(__dirname, p), "utf-8"));

module.exports = (siteConfigPath) => {
  const siteConfig = loadYaml(siteConfigPath);
  const globalConfig = loadYaml("../admin-config/global.yaml");

  const { jsVariables, indexHtmlVariables, lessVariables } = siteConfig;

  return {
    ...siteConfig,
    indexHtmlVariables: {
      ...indexHtmlVariables,
      additionalHeadScripts:
        (indexHtmlVariables.additionalHeadScripts || {})[ENV] || null,
    },
    jsVariables: {
      ...jsVariables,
      CODIKS_THEME: {
        colors: {
          brandPrimary: lessVariables["@brand-primary-color"],
          brandSecondary: lessVariables["@brand-secondary-color"],
        },
      },
    },
  };
};
