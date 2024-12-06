import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import Layout from '@theme/Layout/Provider';
import Footer from '@theme/Footer';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LogoImg from '@site/static/img/phpss-light.svg';
import GithubImg from '@site/static/img/GitHub.svg';

const features = [
    { icon: "🐘", title: "Runs on PHP", description: "No additional software is required—PHPStreamServer runs entirely on PHP. Just install via Composer and get started!" },
    { icon: "⚡", title: "Always-in-memory", description: "Keeps applications loaded in memory for enhanced performance and faster response times." },
    { icon: "🌐", title: "Asynchronous HTTP Server", description: "Built-in HTTP server with support for HTTP/2, HTTPS, GZIP, static file serving, and middleware." },
    { icon: "⚙️", title: "Advanced Worker Management", description: "Includes worker reload strategies based on TTL, memory usage, or exceptions." },
    { icon: "🕒", title: "Flexible Scheduler", description: "Schedule tasks like Cron jobs with customizable intervals." },
    { icon: "📦", title: "Support for External Programs", description: "Manage non-PHP applications alongside PHP workers seamlessly." },
    { icon: "📝", title: "Powerful Logging System", description: "Log to files, Stdout/Stderr, Syslog, or Graylog with advanced log routing." },
    { icon: "📊", title: "Prometheus Metrics Support", description: "Exposes a metrics endpoint for monitoring server performance and tracking custom application metrics." },
    { icon: "📂", title: "File Monitoring for Development", description: "Automatically reloads workers when file changes are detected, perfect for development experience." },
    { icon: "🔌", title: "Plugin System", description: "Extend functionality with built-in plugins or create custom plugins to fit your needs." },
];

const Index = () => {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout title={`${siteConfig.title}`} description="High-performance PHP application server and process manager written in PHP">
            <header className={clsx('hero', styles.heroBanner)}>
                <div className="container">
                    <LogoImg alt="PHPStreamServer" className={styles.logo}/>
                    <p className="hero__subtitle">High-performance PHP application server and process manager written in PHP.</p>
                    <div className={styles.buttons}>
                        <Link className="button button--secondary button--lg" to="/docs/general/">
                            Get started
                        </Link>
                        <Link className="button button--secondary button--lg" href="https://github.com/phpstreamserver/phpstreamserver">
                            <div className={styles.githubButtonGroup}>
                                <GithubImg alt=""/> <span>GitHub</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <div className={styles.featuresSection}>
                <h2>Features</h2>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.featureIcon}>{feature.icon}</div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer></Footer>
        </Layout>
    );
};

export default Index;
