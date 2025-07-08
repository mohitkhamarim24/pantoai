import express from 'express';
import axios from 'axios';
import { autoReviewMap } from './repoRoutes.js';

const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.user) {
    console.log('❌ req.user is undefined');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const provider = req.user.provider;
  const accessToken = req.user.accessToken;
  const name = req.user.displayName || '';
  const email = req.user.emails?.[0]?.value || '';
  const userId = req.user.id
  let username = '';
  let totalRepos = 0;

  try {
    if (provider === 'github') {
      const userInfo = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${accessToken}`,
          'User-Agent': 'PantoApp'
        }
      });

      username = userInfo.data.login || '';

      const repos = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${accessToken}`,
          'User-Agent': 'PantoApp'
        }
      });

      totalRepos = repos.data.length;
    }

    const autoReviewRepos = autoReviewMap[userId]?.length || 0;

    res.json({
      name,
      email,
      username,
      totalRepos,
      autoReviewRepos
    });

  } catch (err) {
    console.error('❌ Error in /profile:', err.message);
    res.status(500).json({ error: 'Profile fetch failed', details: err.message });
  }
});

export default router;
