import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RepoListPage() {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/profile', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => console.error('Profile fetch failed:', err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/repos', { withCredentials: true })
      .then(res => setRepos(res.data))
      .catch(err => console.error('Repo fetch failed:', err));
  }, []);

  const toggleAutoReview = (repoId, enabled) => {
    axios.post(`http://localhost:5000/repos/${repoId}/auto-review`, { enabled }, { withCredentials: true });
    setRepos(prev => prev.map(r => r.id === repoId ? { ...r, autoReviewEnabled: enabled } : r));
  };

  const handleRowClick = (id) => {
    navigate(`/repos/${id}`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={styles.header}>
        <div style={styles.avatar}>{user.name?.[0]?.toUpperCase() || '?'}</div>
        <div style={styles.welcome}>Hello {user.name || 'User'}, welcome back!</div>
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Your Repositories</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Auto Review</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.id} style={styles.tr} onClick={() => handleRowClick(repo.id)}>
              <td style={styles.td}>{repo.name}</td>
              <td style={styles.td} onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={repo.autoReviewEnabled}
                  onChange={(e) => toggleAutoReview(repo.id, e.target.checked)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <a href="/profile" style={{ display: 'block', marginTop: '2rem' }}>
        <button>Go to Profile</button>
      </a>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#0070f3',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },
  welcome: {
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  th: {
    borderBottom: '2px solid black',
    textAlign: 'left',
    padding: '0.75rem',
    background: '#f2f2f2',
  },
  td: {
    padding: '0.75rem',
    borderBottom: '1px solid #ddd',
  },
  tr: {
    cursor: 'pointer',
  },
};
