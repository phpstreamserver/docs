import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import Layout from '@theme/Layout/Provider';
import Footer from '@theme/Footer';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LogoImg from '@site/static/img/phpss-banner.svg';
import GithubImg from '@site/static/img/github.svg';
import CodeBlock from '@theme/CodeBlock';
import Navbar from '@theme/Navbar';
import CodeExample from './CodeExample';
import ParticlesBackground from './ParticlesBackground';

import Icon1 from '@site/static/icons/icon1.svg';
import Icon2 from '@site/static/icons/icon2.svg';
import Icon3 from '@site/static/icons/icon3.svg';
import Icon4 from '@site/static/icons/icon4.svg';
import Icon5 from '@site/static/icons/icon5.svg';
import Icon6 from '@site/static/icons/icon6.svg';
import Icon7 from '@site/static/icons/icon7.svg';
import Icon8 from '@site/static/icons/icon8.svg';
import Icon9 from '@site/static/icons/icon9.svg';
import Icon10 from '@site/static/icons/icon10.svg';

const features = [
    { icon: Icon1, iconColor: 'hsl(283 89% 26%)', title: "Runs on PHP", description: "No additional software is required—PHPStreamServer runs entirely on PHP. Just install via Composer and get started!" },
    { icon: Icon2, iconColor: 'hsl(51 95% 53%)', title: "Always-in-memory", description: "Keeps applications loaded in memory for enhanced performance and faster response times." },
    { icon: Icon3, iconColor: 'hsl(217 91% 60%)', title: "Asynchronous HTTP Server", description: "Built-in HTTP server with support for HTTP/2, HTTPS, GZIP, static file serving, and middleware." },
    { icon: Icon4, iconColor: 'hsl(217 91% 60%)', title: "Advanced Worker Management", description: "Includes worker reload strategies triggered by TTL, memory usage, or exceptions." },
    { icon: Icon5, iconColor: 'hsl(215.4 16.3% 46.9%)', title: "Flexible Scheduler", description: "Schedule tasks like Cron jobs with customizable intervals." },
    { icon: Icon6, iconColor: 'hsl(25 95% 53%)', title: "Support for External Programs", description: "Manage non-PHP applications alongside PHP workers seamlessly." },
    { icon: Icon7, iconColor: 'hsl(51 95% 53%)', title: "Powerful Logging System", description: "Log to files, stdout/stderr, syslog, or Graylog with advanced log routing." },
    { icon: Icon8, iconColor: 'hsl(217 91% 60%)', title: "Prometheus Metrics Support", description: "Exposes a metrics endpoint for monitoring server performance and tracking custom application metrics." },
    { icon: Icon9, iconColor: 'hsl(51 95% 53%)', title: "File Monitoring for Development", description: "Automatically reloads workers when file changes are detected, making it ideal for development." },
    { icon: Icon10, iconColor: 'hsl(215.4 16.3% 46.9%)', title: "Plugin System", description: "Extend functionality with built-in plugins, or create custom ones to fit your needs." },
];

const Index = () => {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout title={`${siteConfig.title}`} description="Application server and process manager for modern PHP applications.">
            <Navbar />
            <header className={styles.heroBanner}>
                <div className="container">
                    <div className="absolute inset-0 z-[-1]">
                        <ParticlesBackground brandColor={'#3c83f6'} linkColor={'#65758b'} count={90} />
                    </div>
                    <LogoImg alt="PHPStreamServer" className="w-auto max-w-full h-[2.5em] lg:h-[3.5em] lg:w-auto mb-5 text-black dark:text-gray-200"/>
                    <h1>Application server and process manager for modern PHP applications.</h1>
                    <div className="text-base dark:text-gray-200">
                        <strong>PHPStreamServer</strong> is a high-performance, event-loop-based application server and supervisor for PHP, written in PHP.<br/>
                        Powered by the <Link href="https://revolt.run/">Revolt</Link> event loop and built on the <Link href="https://amphp.org/">AMPHP</Link> ecosystem, it brings true asynchronous capabilities to PHP applications.<br/>
                        With its extensible plugin system, PHPStreamServer can replace traditional stacks such as Nginx, PHP-FPM, Cron, and Supervisor.
                    </div>
                    <div className={styles.buttons}>
                        <Link className={styles.button} to="/docs/general/">
                            Get Started
                        </Link>
                        <Link className={styles.button} href="https://github.com/phpstreamserver/phpstreamserver">
                            <div className={styles.githubButtonGroup}>
                                <GithubImg alt="" className="w-[1.25em] h-[1.25em] me-1"/> <span>GitHub</span>
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
                                <div className="flex items-top">
                                    <div className={styles.featureIcon}><feature.icon style={{ color: feature.iconColor }} /></div>
                                </div>
                                <div className="flex items-top">
                                   <div>
                                       <div className="text-xl font-semibold mb-1 w-full">{feature.title}</div>
                                       <div className="text-sm">{feature.description}</div>
                                   </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="px-3 py-8 lg:px-4">
                <div className="container">
                    <h2 className={styles.subtitle}>Quick Start</h2>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
                        <div className="flex flex-col flex-1 gap-4">
                            <div className="text-lg">Get up and running with PHPStreamServer in just a few lines of code. Here's a simple HTTP server example to get you started.</div>
                            <div className="font-semibold">Install via composer</div>
                            <CodeBlock language="bash">{`$ composer require phpstreamserver/http-server`}</CodeBlock>
                            <div className="font-semibold">Run your server</div>
                            <CodeBlock language="bash">{`$ php server.php start`}</CodeBlock>
                            <Link className={styles.button} to="/docs/general/">View Full Documentation</Link>
                        </div>
                        <div className="flex-1">
                            <CodeBlock language="php" title="server.php">{CodeExample.trim()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </Layout>
    );
};

export default Index;
