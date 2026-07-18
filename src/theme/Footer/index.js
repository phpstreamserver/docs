import React from 'react';
import Link from '@docusaurus/Link';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import GithubImg from '@site/static/img/github.svg';
import LogoImg from '@site/static/img/phpss-banner.svg';
import styles from './styles.module.css';
import { Mail } from 'lucide-react';

const linkGroups = [
  {
    title: 'Guides',
    links: [
      {label: 'Overview', to: '/docs/general/'},
      {label: 'Quick Start', to: '/docs/general/quick-start'},
      {label: 'Symfony Integration', to: '/docs/integrations/symfony'},
    ],
  },
  {
    title: 'Plugins',
    links: [
      {label: 'HTTP Server', to: '/docs/plugins/http-server'},
      {label: 'Scheduler', to: '/docs/plugins/scheduler'},
      {label: 'Logger', to: '/docs/plugins/logger'},
      {label: 'File Monitor', to: '/docs/plugins/file-monitor'},
      {label: 'Metrics', to: '/docs/plugins/metrics'},
    ],
  },
];

export default function Footer() {
  const {disableSwitch, respectPrefersColorScheme} = useThemeConfig().colorMode;
  const {colorModeChoice, setColorMode} = useColorMode();

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 py-6 lg:py-8">
          <div className={`${styles.brand} w-80 shrink-0`}>
            <LogoImg alt="PHPStreamServer" className={`${styles.logo} mb-2 h-auto w-full`} />
            <p className="mb-4">
              Application server and process manager for modern PHP applications.
            </p>
            <div className="flex items-center gap-3">
              <Link className={styles.socialLink} href="https://github.com/phpstreamserver/phpstreamserver">
                <GithubImg aria-hidden="true" className={styles.socialIcon} />
              </Link>
              <Link className={styles.socialLink} href="mailto:anton.z@live.com">
                <Mail aria-hidden="true" className={styles.socialIcon} />
              </Link>
              {!disableSwitch && (
                <>
                  <div className={`${styles.divider} w-px self-stretch mx-1`} aria-hidden="true"></div>
                  <ColorModeToggle className={styles.themeToggle} respectPrefersColorScheme={respectPrefersColorScheme} value={colorModeChoice} onChange={setColorMode} />
                </>
              )}
            </div>
          </div>

          <nav className="flex flex-row flex-wrap gap-10 lg:gap-20">
            {linkGroups.map((group) => (
              <div key={group.title} className="shrink-0">
                <div className={styles.linkTitle}>
                  {group.title}
                </div>
                <div className="space-y-2!">
                  {group.links.map((link) => (
                      <Link key={link.to} className={styles.footerLink} to={link.to}>
                        {link.label}
                      </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className={`${styles.copyright} py-3`}>
          © {year} PHPStreamServer
        </div>
      </div>
    </footer>
  );
}
