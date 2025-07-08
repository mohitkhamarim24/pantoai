import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/profile', { withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.avatar}>{profile.name?.[0]?.toUpperCase() || '?'}</div>
        <h2 style={styles.heading}>{profile.name}</h2>
        <p style={styles.email}>{profile.email || 'No email available'}</p>

        <div style={styles.stats}>
          <div style={styles.statBox}>
            <p style={styles.statNumber}>{profile.totalRepos || 0}</p>
            <p style={styles.statLabel}>Total Repos</p>
          </div>
          <div style={styles.statBox}>
            <p style={styles.statNumber}>{profile.autoReviewRepos || 0}</p>
            <p style={styles.statLabel}>Auto-Reviewed</p>
          </div>
        </div>

        <a href="http://localhost:5000/logout" style={styles.logoutLink}>
          <button style={styles.logoutButton}>Logout</button>
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f0f4f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  card: {
    background: '#fff',
    padding: '2rem 3rem',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '400px',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#0070f3',
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  heading: {
    fontSize: '1.5rem',
    margin: '0.5rem 0',
  },
  email: {
    color: '#555',
    fontSize: '0.95rem',
    marginBottom: '2rem',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '2rem',
  },
  statBox: {
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    margin: 0,
  },
  statLabel: {
    fontSize: '0.9rem',
    color: '#666',
  },
  logoutLink: {
    textDecoration: 'none',
  },
  logoutButton: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#e53e3e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};
