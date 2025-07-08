import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/passport.js';
import repoRoutes from './routes/repoRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: 'http://localhost:3000/repos',
  failureRedirect: '/',
}));

app.get('/auth/gitlab', passport.authenticate('gitlab'));
app.get('/auth/gitlab/callback', passport.authenticate('gitlab', {
  successRedirect: 'http://localhost:3000/repos',
  failureRedirect: '/',
}));

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

// APIs
app.use('/repos', repoRoutes);
app.use('/profile', profileRoutes);

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));