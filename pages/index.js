import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/Footer.js'
import Header from '../components/Header.js'
import { List, ListItem } from '../components/List.js'
import InfoPill from '../components/InfoPill.js'
import CommentIcon from '../components/CommentIcon.js'

export default function Home(props) {
  const { issues, errorCode } = props;

  if (errorCode) {
    return (
      <div className="container">
        <Head>
          <title>Error</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Header
            title="walmartlabs/thorax issue tracker"
            description={`Error: ${errorCode}`}>
          </Header>
        </main>
      </div> 
    )
  }
  const [page, setPage] = useState(1);

  const maxPages = Math.ceil(issues.length / 10);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header
          title="walmartlabs/thorax issue tracker"
          description={[
            "Browse ",<a href="https://github.com/walmartlabs/thorax">walmartlabs/thorax</a>
          ]}>
        </Header>
        <section>
          <h2>Issues</h2>

          <List>
            <div className={styles.paginationControlsContainer}>
              <div className={styles.paginationControls}>
                <button className={styles.previousButton} onClick={() => {
                  if (page > 1) setPage(page - 1);
                }}></button>

                <button className={styles.nextButton} onClick={() => {
                  if (page < maxPages) setPage(page + 1);
                }}></button>

                <p>Page {page} of {maxPages}</p>
              </div>
            </div>

            {issues && issues.slice((page-1) * 10, (page-1)*10 + 10).map((i) => (
              <ListItem key={i.number}>
                <div className={styles.issueRow}>
                  <div>
                    <div className={styles.issueTitle}>
                      <span className={styles.issueNumber}>#{i.number}:</span> <a href={`/issue/${i.number}`}>{i.title}</a>
                    </div>
                    <div className={styles.issueDetails}>
                      <p>Created on {new Date(i.created_at).toLocaleString()} by <a href={i.user.html_url} target="_blank">{i.user.login}</a></p> 
                    </div>
                  </div>

                  <div className={styles.issueRowRight}>
                    {i.comments > 0 && (
                      <div className={styles.commentCount}>
                        <CommentIcon />
                        <span>{i.comments}</span>
                      </div>
                    )}

                    <div>
                      {i.state === "closed" ? <InfoPill inline>Closed</InfoPill> : <InfoPill inline>Open</InfoPill>} 
                    </div>
                  </div>

                </div>
              </ListItem>
            ))}
          </List>
        </section>
      </main>

      <Footer>
      </Footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch("https://api.github.com/repos/walmartlabs/thorax/issues?per_page=1000&state=all");
  const data = await res.json();

  if (res.status !== 200) {
    return {
      props: {
        errorCode: res.status,
        issues: null
      }
    }
  }

  return {
    props: {
      issues: data
    }
  }
}
