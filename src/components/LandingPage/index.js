import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import Layout from '@theme/Layout/Provider';
import Footer from '@theme/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LogoImg from '@site/static/img/phpss-banner.svg';
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
            <header className={styles.heroBanner}>
                <div className="container">
                    <LogoImg alt="PHPStreamServer" className="w-auto max-w-full h-[2.5em] lg:h-[3.5em] lg:w-auto mb-5 text-black dark:text-gray-200"/>
                    <div className="mb-5 text-md md:text-xl lg:text-2xl font-semibold dark:text-gray-200">
                        High-performance PHP application server and process manager written in PHP
                    </div>
                    <div className="text-base dark:text-gray-200">
                        PHPStreamServer is a high-performance, event-loop-based application server and supervisor for PHP, written in PHP.<br/>
                        Powered by the  <Link href="https://revolt.run/">Revolt</Link> event loop and built on the <Link href="https://amphp.org/">AMPHP</Link> ecosystem, it brings true asynchronous capabilities to your applications.<br/>
                        PHPStreamServer is highly extensible with its plugin system, allowing it to replace traditional setups like Nginx, PHP-FPM, Cron, and Supervisor.
                    </div>
                    <div className={styles.buttons}>
                        <Link className={styles.button} to="/docs/general/">
                            Get started
                        </Link>
                        <Link className={styles.button} href="https://github.com/phpstreamserver/phpstreamserver">
                            <div className={styles.githubButtonGroup}>
                                <GithubImg alt="" fill="currentColor" className="w-[1.25em] h-[1.25em] me-1"/> <span>GitHub</span>
                            </div>
                        </Link>
                        <img className="hidden md:block h-[1.5em]" src="https://img.shields.io/github/stars/phpstreamserver/phpstreamserver" alt="Stars"/>
                    </div>
                </div>
            </header>

            <div className="px-3 py-8 lg:px-4">
                <div className="container">
                    <h2 className={styles.subtitle}>Features</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className="flex items-center">
                                    <div className={styles.featureIcon}>{feature.icon}</div>
                                </div>
                                <div className="flex items-center">
                                   <div>
                                       <div className="text-lg font-semibold mb-1 w-full">{feature.title}</div>
                                       <div className="text-sm">{feature.description}</div>
                                   </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </Layout>
    );
};

export default Index;
