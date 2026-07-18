import {useEffect, useState} from 'react';
import styles from './Terminal.module.css';

const getCurrentTimestamp = () => {
    return `${new Date().toISOString().slice(0, 19)}+00:00`;
}

export default function Terminal() {
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
        setTimestamp(getCurrentTimestamp());
    }, []);

    return (
        <div className={styles.terminal} role="region" aria-label="PHPStreamServer startup output">
            <div className={styles.controls} aria-hidden="true">
                <span />
                <span />
                <span />
            </div>
            <div className={styles.output}>
                <div className={styles.product}>
                    <span className={styles.prompt}>❯</span>
                    <span>🌸 PHPStreamServer – PHP application server</span>
                </div>

                <div className={styles.meta}>
                    <span>PHPStreamServer version:</span><span>0.8.2</span>
                    <span>PHP version:</span><span>8.5.4</span>
                    <span>Event loop driver:</span><span>UvDriver</span>
                    <span>Workers count:</span><span>1</span>
                </div>

                <div className={styles.sectionTitle}>
                    <span className={styles.prompt}>❯</span>
                    <span>Workers</span>
                </div>
                <div className={styles.workers}>
                    <span className={styles.green}>User</span>
                    <span className={styles.green}>Worker</span>
                    <span className={styles.green}>Count</span>
                    <span>user</span>
                    <span>Web Server</span>
                    <span>1</span>
                </div>

                <div>Press Ctrl+C to stop.</div>

                <div>
                    <div>
                        <span className={styles.timestamp}>[{timestamp}]</span>{' '}
                        <span className={styles.green}>server</span>.<span className={styles.cyan}>INFO</span>{' '}
                        <span>PHPStreamServer has started</span>
                    </div>
                    <div>
                        <span className={styles.timestamp}>[{timestamp}]</span>{' '}
                        <span className={styles.green}>http</span>.<span className={styles.debug}>DEBUG</span>{' '}
                        <span>Starting server</span>
                    </div>
                    <div>
                        <span className={styles.timestamp}>[{timestamp}]</span>{' '}
                        <span className={styles.green}>http</span>.<span className={styles.cyan}>INFO</span>{' '}
                        <span>Started server</span>
                    </div>
                    <div>
                        <span className={styles.timestamp}>[{timestamp}]</span>{' '}
                        <span className={styles.green}>http</span>.<span className={styles.cyan}>INFO</span>{' '}
                        <span>Listening on http://0.0.0.0:8080/</span>
                    </div>
                    <div><span className={styles.cursor} aria-hidden="true" /></div>
                </div>
            </div>
        </div>
    );
}
