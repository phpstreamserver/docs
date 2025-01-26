/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  docs: [
    {
      type: 'category',
      label: 'General',
      items: [
        'general/index',
        'general/quick-start',
        'general/installation',
        'general/configuration',
        'general/reload-strategies',
      ],
      collapsible: false,
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Plugins',
      items: [
        'plugins/index',
        'plugins/http-server',
        'plugins/scheduler',
        'plugins/logger',
        'plugins/file-monitor',
        'plugins/metrics',
      ],
      collapsible: false,
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/symfony',
      ],
      collapsible: false,
      collapsed: false,
    },
  ],
};

export default sidebars;
