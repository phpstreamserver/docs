import React from 'react';
import LogoImg from '@site/static/img/phpss-banner.svg';
import GithubImg from '@site/static/img/github.svg';
import TwitterImg from '@site/static/img/twitter.svg';
import EmailImg from '@site/static/img/email.svg';
import Link from "@docusaurus/Link";
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';

export default function LayoutWrapper(props) {
  const {copyright, links, logo, style} = props;
  const {disableSwitch, respectPrefersColorScheme} = useThemeConfig().colorMode;
  const {colorModeChoice, setColorMode} = useColorMode();

  return (
      <footer className="footer">
          <div className="container container-fluid">
              <div className="flex gap-8 lg:gap-20 flex-col-reverse lg:flex-row">
                  <div className="max-w-full lg:max-w-xs text-sm">
                      <div className="mb-3">
                          <LogoImg alt="PHPStreamServer" className="w-auto max-w-full"/>
                      </div>
                      <div className="mb-4">
                          Application server and process manager for modern PHP applications.
                      </div>
                      <div className="flex gap-3">
                          <Link className="footer__link-item size-[1.25rem]" href="https://github.com/phpstreamserver/phpstreamserver">
                              <GithubImg alt="GitHub" className="w-full h-full"/>
                          </Link>
                          {/*<Link className="footer__link-item" href="#">*/}
                          {/*    <TwitterImg alt="Twitter" className="w-[1.2rem] h-[1.2rem]"/>*/}
                          {/*</Link>*/}
                          <Link className="footer__link-item size-[1.25rem]" href="mailto:anton.z@live.com">
                              <EmailImg alt="Email" className="w-full h-full"/>
                          </Link>

                          {!disableSwitch && (
                            <div className="w-px self-stretch bg-gray-300 mx-1"></div>
                          )}
                          {!disableSwitch && (
                              <ColorModeToggle
                                  className="size-[1.25rem]!"
                                  respectPrefersColorScheme={respectPrefersColorScheme}
                                  value={colorModeChoice}
                                  onChange={setColorMode}
                              />
                          )}
                      </div>
                  </div>
                  <div className="flex-1">
                      {links}
                  </div>
              </div>
          </div>
      </footer>
  );
}
