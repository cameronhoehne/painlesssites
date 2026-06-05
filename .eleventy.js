// ─────────────────────────────────────────────────────────────────────────────
// ELEVENTY CONFIGURATION
// This file configures how Eleventy builds your static site
// Documentation: https://www.11ty.dev/docs/config/
// ─────────────────────────────────────────────────────────────────────────────

// 📦 Plugin Imports
const pluginImages = require("@codestitchofficial/eleventy-plugin-sharp-images");
const pluginMinifier = require("@codestitchofficial/eleventy-plugin-minify");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
const eleventyNavigation = require("@11ty/eleventy-navigation");

// ⚙️ Configuration Files
const configSitemap = require("./src/config/plugins/sitemap");
const configImages = require("./src/config/plugins/images");

// 🔧 Processing Functions
const less = require("./src/config/processors/less");
const javascript = require("./src/config/processors/javascript");

// 🛠️ Utilities
const filterPostDate = require("./src/config/filters/postDate");
const filterIsoDate = require("./src/config/filters/isoDate");
const filterTitleCase = require("./src/config/filters/titleCase");
const isProduction = process.env.ELEVENTY_ENV === "PROD";

module.exports = function (eleventyConfig) {
	// eleventyConfig.on("eleventy.after", javascript);
	// eleventyConfig.on("eleventy.after", less);

	eleventyConfig.addPlugin(pluginImages, configImages);
	eleventyConfig.addPlugin(pluginSitemap, configSitemap);
	eleventyConfig.addPlugin(eleventyNavigation);

	if (isProduction) {
		eleventyConfig.addPlugin(pluginMinifier);
	}

	eleventyConfig.addPassthroughCopy("./src/assets");
	eleventyConfig.addPassthroughCopy("./src/admin");
	eleventyConfig.addPassthroughCopy("./src/_redirects");

	eleventyConfig.addFilter("titleCase", filterTitleCase);
	eleventyConfig.addFilter("postDate", filterPostDate);
	eleventyConfig.addFilter("isoDate", filterIsoDate);

	eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

	return {
		dir: {
			input: "src",
			output: "public",
			includes: "_includes",
			data: "_data",
		},
		htmlTemplateEngine: "njk",
	};
};
