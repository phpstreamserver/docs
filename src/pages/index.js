import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout/Provider';
import Footer from '@theme/Footer';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import Logo from '@site/static/img/phpss-light.svg';
import GithubImg from '@site/static/img/GitHub.svg';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Logo alt="PHPStreamServer" className="hero__title" className={styles.logo} />
        <p className="hero__subtitle">High-performance PHP application server and process manager written in PHP.</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/general/">
              Get started
          </Link>
          <Link className="button button--secondary button--lg" href="https://github.com/phpstreamserver/phpstreamserver">
              <GithubImg alt="" /> GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="PHPStreamServer is a high-performance PHP application server and process manager written in PHP.">
      <HomepageHeader />
      <main className={styles.main}>
        <HomepageFeatures />
      </main>
      <Footer></Footer>
    </Layout>
  );
}
