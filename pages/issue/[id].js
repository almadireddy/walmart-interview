import { useRouter } from 'next/router';
import Header from '../../components/Header.js'
import styles from '../../styles/Issue.module.css'
import InfoPill from '../../components/InfoPill.js'
import DOMPurify from 'isomorphic-dompurify';

const Issue = (props) => {
    const router = useRouter();
    const { id } = router.query;

    const { issue, comments } = props;

    return (
        <div className="container">
            <main>
                <div className={styles.navigation}>
                    <a href="/">
                        All issues 
                    </a>
                </div>
                <Header
                    title={[<span className={styles.issueNumber}>#{issue.number} </span>, issue.title]}
                    description={null}>
                </Header>

                <div className={styles.details}> 
                    <InfoPill inline className={styles.state}>
                        {issue.state === "closed" ? <span>Closed</span> : <span>Open</span>}
                    </InfoPill>
                    <p>
                        Created on {new Date(issue.created_at).toLocaleString()} by <a href={issue.user.html_url} target="_blank">{issue.user.login}</a>
                    </p>
                </div>

                <div className={styles.comment} >
                    <div className={styles.avatarUrl}>
                        <img src={issue.user.avatar_url} />
                    </div>
                    <div className={styles.commentContent}>
                        <div className={styles.commentUser}>
                            <p><a href={issue.user.html_url} target="_blank" className={styles.commentLogin}>{issue.user.login}</a> opened this issue on {new Date(issue.created_at).toLocaleString()}</p>
                        </div>

                        <div className={styles.commentBody} dangerouslySetInnerHTML={{ __html: issue.body }}>
                        </div>
                    </div>
                </div>

                {comments && comments.map((c) => (
                    <div key={c.id} className={styles.comment} >
                        <div className={styles.avatarUrl}>
                            <img src={c.user.avatar_url} />
                        </div>
                        <div className={styles.commentContent}>
                            <div className={styles.commentUser}>
                                <p><a target="_blank" href={c.user.html_url} className={styles.commentLogin}>{c.user.login}</a> commented on {new Date(c.created_at).toLocaleString()}</p>
                            </div>

                            <div className={styles.commentBody} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.body) }}>
                            </div>
                        </div>
                    </div>
                ))}

                {issue.state === "closed" && (
                    <div className={`${styles.comment} ${styles.lastComment}`}>
                        <div className={styles.avatarUrl}>
                            <img src={issue.closed_by.avatar_url} />
                        </div>
                        <div className={styles.commentContent}>
                            <div className={styles.commentUser}>
                                <p><a href={issue.closed_by.html_url} target="_blank" className={styles.commentLogin}>{issue.closed_by.login}</a> closed this issue on {new Date(issue.closed_at).toLocaleString()}</p>

                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.endDetails}>
                </div>

            </main>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    
    const res = await fetch(`https://api.github.com/repos/walmartlabs/thorax/issues/${params.id}`)
    const issue = await res.json();

    const res2 = await fetch(`https://api.github.com/repos/walmartlabs/thorax/issues/${params.id}/comments`);
    const comments = await res2.json();

    return {
        props: {
            comments,
            issue 
        }
    }
}

export default Issue;
