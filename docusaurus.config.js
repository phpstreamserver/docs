// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PHPStreamServer: Asynchronous application server for PHP',
  tagline: 'PHP Application Server',
  favicon: 'img/phpss-icon.png',

  // Set the production url of your site here
  url: 'https://phpstreamserver.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/phpstreamserver/docs/tree/main/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {name: 'description', content: 'High-performance PHP application server and process manager written in PHP'},
        {name: 'og:description', content: 'High-performance PHP application server and process manager written in PHP'},
      ],
      // Replace with your project's social card
      image: 'img/ograph.png',
      navbar: {
        //title: 'My Site',
        logo: {
          alt: 'PHPStreamServer',
          src: 'img/phpss-light.svg',
          srcDark: 'img/phpss-dark.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'https://github.com/phpstreamserver/phpstreamserver',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Guide',
            items: [
              {
                label: 'What is PHPStreamServer?',
                to: '/docs/general/',
              },
              {
                label: 'Quick Start',
                to: '/docs/general/quick-start',
              },
            ],
          },
          {
            title: 'Plugins',
            items: [
              {
                label: 'Http Server',
                to: '/docs/plugins/http-server',
              },
              {
                label: 'Scheduler',
                to: '/docs/plugins/scheduler',
              },
              {
                label: 'Logger',
                to: '/docs/plugins/logger',
              },
              {
                label: 'File Monitor',
                to: '/docs/plugins/file-monitor',
              },
              {
                label: 'Metrics',
                to: '/docs/plugins/metrics',
              },
            ],
          },
          {
            title: 'Integrations',
            items: [
              {
                label: 'Symfony',
                href: '/docs/integrations/symfony',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/phpstreamserver/phpstreamserver',
              },
            ],
          },
        ],
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php']
      },
    }),

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("@tailwindcss/postcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};

export default config;
