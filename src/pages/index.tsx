import Head from 'next/head';
import Image from 'next/image';
import LinkImage from './link-image';
import CopyButton from './copy-button';
import CounterButton from './counter-button';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [link1Hover, setLink1Hover] = useState(false);
  const [link2Hover, setLink2Hover] = useState(false);
  const [link3Hover, setLink3Hover] = useState(false);
  const [link4Hover, setLink4Hover] = useState(false);
  const [link5Hover, setLink5Hover] = useState(false);

  return (
    <>
      <Head>
        <title>Fingerhuth</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="ryan fingerhuth's personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.columnMain}>
            <div className={styles.header}>
              <Image
                className={styles.spritePreFix}
                src="/images/trainer-walking.png"
                alt="trainer"
                width={16}
                height={16}
              />
              Ryan Fingerhuth
            </div>

            <div className={styles.list}>
              <a
                onMouseEnter={() => setLink1Hover(true)}
                onMouseLeave={() => setLink1Hover(false)}
                className={styles.card}
                href="https://www.linkedin.com/in/ryan-fingerhuth/"
                target="_blank"
                rel="noopener noreferrer">
                {link1Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-bird'}
                    hover={true}
                  />
                )}
                {!link1Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-bird'}
                    hover={false}
                  />
                )}
                LinkedIn
              </a>
              <a
                onMouseEnter={() => setLink2Hover(true)}
                onMouseLeave={() => setLink2Hover(false)}
                className={styles.card}
                href="https://github.com/Ryan-Fingerhuth/"
                target="_blank"
                rel="noopener noreferrer">
                {link2Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-rhydon'}
                    hover={true}
                  />
                )}
                {!link2Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-rhydon'}
                    hover={false}
                  />
                )}
                Github
              </a>
              <div
                className={styles.card}
                onMouseEnter={() => setLink5Hover(true)}
                onMouseLeave={() => setLink5Hover(false)}>
                <a
                  href="mailto:contact@ryanfingerhuth.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  {link5Hover && (
                    <LinkImage
                      className={styles.spritePreFix}
                      imageName={'pkm-icon-snake'}
                      hover={true}
                    />
                  )}
                  {!link5Hover && (
                    <LinkImage
                      className={styles.spritePreFix}
                      imageName={'pkm-icon-snake'}
                      hover={false}
                    />
                  )}
                  Email
                </a>
                <CopyButton
                  className={styles.copyButton}
                  copyText="contact@ryanfingerhuth.com"
                />
              </div>
            </div>

            <div className={styles.header}>
              <Image
                className={styles.spritePreFix}
                src="/images/pkm-icon-fossil.png"
                alt="trainer"
                width={16}
                height={16}
              />
              Fun Projects
            </div>
            <div className={styles.list}>
              <a
                onMouseEnter={() => setLink3Hover(true)}
                onMouseLeave={() => setLink3Hover(false)}
                className={styles.card}
                href="https://pokemon-poster.com"
                target="_blank"
                rel="noopener noreferrer">
                {link3Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-bug'}
                    hover={true}
                  />
                )}
                {!link3Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-bug'}
                    hover={false}
                  />
                )}
                Pokemon Poster
              </a>
              <a
                onMouseEnter={() => setLink4Hover(true)}
                onMouseLeave={() => setLink4Hover(false)}
                className={styles.card}
                href="https://ryanfingerhuth.com"
                rel="noopener noreferrer">
                {link4Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-plant'}
                    hover={true}
                  />
                )}
                {!link4Hover && (
                  <LinkImage
                    className={styles.spritePreFix}
                    imageName={'pkm-icon-plant'}
                    hover={false}
                  />
                )}
                Card Collector (Coming Soon)
              </a>
            </div>
          </div>
          <div className={styles.columnSecondary}>
            {/* <CounterButton buttonClassName={styles.copyButton}></CounterButton> */}
          </div>
        </div>
      </main>
    </>
  );
}
