import express from 'express';
import axios from 'axios';
import { execSync } from 'child_process';
import fs from 'fs';

const router = express.Router();
let autoReviewMap = {}; // { userId: [repoId1, repoId2] }

// ✅ GET all repos
router.get('/', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const token = req.user.accessToken;
    const provider = req.user.provider;
    const userId = req.user.id;
    let repos = [];

    if (provider === 'github') {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: { Authorization: `token ${token}` }
      });

      repos = response.data.map(repo => ({
        id: repo.id.toString(),
        name: repo.name,
        stars: repo.stargazers_count,
        defaultBranch: repo.default_branch,
        autoReviewEnabled: autoReviewMap[userId]?.includes(repo.id.toString()) || false
      }));
    }

    res.json(repos);
  } catch (err) {
    console.error('❌ Error fetching repos:', err.message);
    res.status(500).json({ error: 'Fetching repos failed' });
  }
});

// ✅ POST toggle auto-review
router.post('/:repoId/auto-review', (req, res) => {
  const user = req.user;
  const { repoId } = req.params;
  const { enabled } = req.body;

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const userId = user.id;
  const repoIdStr = repoId.toString();
  if (!autoReviewMap[userId]) autoReviewMap[userId] = [];

  if (enabled) {
    if (!autoReviewMap[userId].includes(repoIdStr)) {
      autoReviewMap[userId].push(repoIdStr);
    }
  } else {
    autoReviewMap[userId] = autoReviewMap[userId].filter(id => id !== repoIdStr);
  }

  res.json({ success: true });
});

// ✅ GET repo details by ID
router.get('/:id/details', async (req, res) => {
  console.log("👉 Hit /repos/:id/details route");
  const user = req.user;
  const { id } = req.params;

  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const token = user.accessToken;
  const userId = user.id;

  try {
    const url = `https://api.github.com/repositories/${id}`; // ✅ ID-based endpoint
    const repoResp = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': 'PantoApp'
      }
    });

    const repo = repoResp.data;
    const path = `./temp-${repo.id}`;
    let totalLines = 0;

    try {
      execSync(`git clone --depth=1 ${repo.clone_url} ${path}`);
      const output = execSync(`cd ${path} && git ls-files | xargs wc -l`);
      const lines = output.toString().split('\n');
      totalLines = lines.reduce((sum, line) => {
        const num = parseInt(line.trim().split(/\s+/)[0], 10);
        return isNaN(num) ? sum : sum + num;
      }, 0);
      fs.rmSync(path, { recursive: true, force: true });
    } catch (err) {
      console.error('❌ Failed to clone or count lines:', err.message);
    }

    res.json({
      name: repo.name,
      stars: repo.stargazers_count,
      defaultBranch: repo.default_branch,
      autoReviewEnabled: autoReviewMap[userId]?.includes(repo.id.toString()) || false,
      totalLines
    });
  } catch (err) {
    console.error('❌ Repo details error:', err.message);
    res.status(500).json({ error: 'Failed to fetch repo details', details: err.message });
  }
});

export { autoReviewMap };
export default router;
