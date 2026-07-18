import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import GithubImg from '@site/static/img/github.svg';
import LogoImg from '@site/static/img/phpss-banner.svg';
import CodeExample from './CodeExample';
import Terminal from './Terminal';
import styles from './index.module.css';
import { Code, Cpu, Globe, RefreshCw, CalendarClock, SquareTerminal, Logs, ChartNoAxesCombined, FolderSync, Puzzle, TriangleAlert } from 'lucide-react';

const features = [
    {
        icon: Code,
        title: 'Built Entirely in PHP',
        description: 'No separate web server, process manager, or scheduler is required. Install it with Composer and run it with PHP.',
    },
    {
        icon: Cpu,
        title: 'Always in Memory',
        description: 'Keeps your application loaded between requests, reducing startup overhead and improving response times.',
    },
    {
        icon: Globe,
        title: 'Asynchronous HTTP Server',
        description: 'Serve applications directly with built-in support for HTTP/2, HTTPS, gzip compression, static files, and middleware.',
    },
    {
        icon: RefreshCw,
        title: 'Worker Lifecycle Management',
        description: 'Automatically restart workers based on memory usage, maximum lifetime, request count, or unhandled exceptions.',
    },
    {
        icon: CalendarClock,
        title: 'Flexible Task Scheduler',
        description: 'Run recurring tasks using cron expressions, fixed intervals, or specific date and time schedules.',
    },
    {
        icon: SquareTerminal,
        title: 'External Process Supervision',
        description: 'Run and supervise non-PHP programs alongside PHP workers from the same unified runtime.',
    },
    {
        icon: Logs,
        title: 'Configurable Log Routing',
        description: 'Route logs by channel and severity to files, stdout and stderr, syslog, or Graylog.',
    },
    {
        icon: ChartNoAxesCombined,
        title: 'Prometheus Metrics',
        description: 'Expose server performance metrics and register custom metrics for application-specific monitoring.',
    },
    {
        icon: FolderSync,
        title: 'Development File Monitoring',
        description: 'Automatically reloads workers when monitored files change, so code updates take effect immediately during development.',
    },
    {
        icon: Puzzle,
        title: 'Extensible Plugin System',
        description: 'Enable built-in plugins or create custom ones to add project-specific functionality.',
    },
];

export default function LandingPage() {
    const {siteConfig} = useDocusaurusContext();

    return (
        <Layout title={siteConfig.title}>
            <main className={styles.page}>
                <header className={`${styles.heroBanner} py-12 lg:py-22`}>
                    <div className={styles.heroGrid} aria-hidden="true" />
                    <div className="container">
                        <LogoImg alt="PHPStreamServer" className={`${styles.heroLogo} mb-6`} />
                        <div className="grid grid-cols-1 xl:grid-cols-12 gap-9">
                            <div className={`${styles.heroContent} xl:col-span-7`}>
                                <h1>Application server and process manager for modern PHP applications.</h1>

                                <div className={`${styles.heroDescription} my-6`}>
                                    <p>
                                        <strong>PHPStreamServer</strong> is an event-loop-based application server and process supervisor built entirely <span className="whitespace-nowrap">in PHP.</span>
                                    </p>
                                    <p>
                                        Its extensible plugin system provides HTTP application serving, task scheduling, and process supervision within a unified runtime, without requiring Nginx, PHP-FPM, Cron, or Supervisor.
                                    </p>
                                    <p>
                                        Powered by the <Link href="https://revolt.run/">Revolt</Link> event loop and the <Link href="https://amphp.org/">AMPHP</Link> ecosystem, it enables asynchronous, concurrent execution in PHP applications.
                                    </p>
                                </div>

                                <div className={`${styles.warning} my-6`}>
                                    <TriangleAlert/>
                                    <div>
                                        <b>Preview:</b> PHPStreamServer is under active development and is not yet production-ready.
                                    </div>
                                </div>

                                <div className="flex gap-4 my-6">
                                    <Link className={styles.primaryButton} to="/docs/general/">
                                        Get Started
                                    </Link>
                                    <Link className={styles.secondaryButton} href="https://github.com/phpstreamserver/phpstreamserver">
                                        <GithubImg aria-hidden="true" />
                                        <span>GitHub</span>
                                    </Link>
                                </div>


                            </div>

                            <div className="hidden xl:block xl:col-span-5 pt-2">
                                <Terminal/>
                            </div>
                        </div>
                    </div>


                </header>

                <section className={`${styles.featuresSection} py-8 lg:py-12`}>
                    <div className="container">
                        <div className={`${styles.sectionHeading} mb-6 lg:mb-10`}>
                            <h2>Features</h2>
                            <span/>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {features.map((feature) => (
                                <div key={feature.title} className={`${styles.featureCard} p-3 lg:p-4`}>
                                    <div className={`${styles.featureIcon}`}>
                                        <feature.icon aria-hidden="true" />
                                    </div>
                                    <div className={styles.featureContent}>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                    <feature.icon className={styles.featureWatermark} aria-hidden="true" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={`${styles.quickStartSection} py-8 lg:py-12`}>
                    <div className="container">
                        <div className={`${styles.sectionHeading} mb-6 lg:mb-10`}>
                            <h2>Quick Start</h2>
                            <span/>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                            <div className="col-span-4">
                                <div className="mb-6">Install PHPStreamServer and start a simple HTTP server with the following minimal configuration.</div>

                                <div className={`${styles.commandStep} mb-6`}>
                                <div className="font-semibold leading-none mb-2">Install via Composer</div>
                                    <CodeBlock language="bash">{`composer require phpstreamserver/http-server`}</CodeBlock>
                                </div>

                                <div className={`${styles.commandStep} mb-6`}>
                                    <div className="font-semibold leading-none mb-2">Start the server</div>
                                    <CodeBlock language="bash">{`php server.php start`}</CodeBlock>
                                </div>

                                <Link className={styles.readFullDocButton} to="/docs/general/">
                                    View Documentation
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 10h13" />
                                    <path d="M11 5l5 5-5 5" />
                                </svg>
                                </Link>
                            </div>

                            <div className={`${styles.codeExample} col-span-6`}>
                                <div className={styles.editorHeader}>
                                    <div className={styles.controls} aria-hidden="true">
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <span className={styles.editorFile}>server.php</span>
                                </div>
                                <CodeBlock language="php">{CodeExample.trim()}</CodeBlock>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
