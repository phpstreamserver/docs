import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'PSR-7 HTTP server',
    description: (
      <>
        PHPStreamServer has a built-in PSR-7 web server. You can easily integrate it with any PSR-7 compatible framework.
      </>
    ),
  },
  {
    title: 'Supervisor',
    description: (
      <>
        Run your own long-running processes. PHPStreamServer will keep them alive.
      </>
    ),
  },
  {
    title: 'Workers lifecycle management',
    description: (
      <>
        Reload workers based on predefined conditions such as TTL, maximum memory usage, and more.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
