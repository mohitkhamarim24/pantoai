import React from 'react';

export default function LoginPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome to Panto!</h2>
        <p style={styles.sub}>Login to continue</p>
        
        <a href="http://localhost:5000/auth/github" style={styles.buttonGithub}>
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={styles.icon} />
          Login with GitHub
        </a>

        <a href="http://localhost:5000/auth/gitlab" style={styles.buttonGitlab}>
          <img src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png" alt="GitLab" style={styles.icon} />
          Login with GitLab
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f7f9fc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    background: '#fff',
    padding: '3rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
  },
  sub: {
    color: '#777',
    marginBottom: '2rem',
  },
  buttonGithub: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'center',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    backgroundColor: '#24292f',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  buttonGitlab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    justifyContent: 'center',
    padding: '0.75rem',
    borderRadius: '8px',
    backgroundColor: '#fc6d26',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  icon: {
    width: '20px',
    height: '20px',
  }
};
