import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RepoDetailsPage() {
  const navigate = useNavigate();

  // 🔒 Hardcoded dummy values
  const details = {
    name: "Example Repo",
    autoReviewEnabled: true,
    stars: 42,
    defaultBranch: "main",
    totalLines: 1234,
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Repository Details</h2>
      <table style={{ width: '100%', maxWidth: '600px', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td style={styles.label}>Name</td>
            <td style={styles.value}>{details.name}</td>
          </tr>
          <tr>
            <td style={styles.label}>Auto Review Enabled</td>
            <td style={styles.value}>{details.autoReviewEnabled ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td style={styles.label}>Stars</td>
            <td style={styles.value}>{details.stars}</td>
          </tr>
          <tr>
            <td style={styles.label}>Default Branch</td>
            <td style={styles.value}>{details.defaultBranch}</td>
          </tr>
          <tr>
            <td style={styles.label}>Total Lines</td>
            <td style={styles.value}>{details.totalLines}</td>
          </tr>
        </tbody>
      </table>

      <button style={{ marginTop: '2rem' }} onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
}

const styles = {
  label: {
    fontWeight: 'bold',
    padding: '0.75rem',
    backgroundColor: '#f2f2f2',
    width: '200px',
  },
  value: {
    padding: '0.75rem',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
  },
};
