import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RepoListPage from './components/RepoListPage';
import RepoDetailsPage from './components/RepoDetailsPage';
import ProfilePage from './components/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/repos" element={<RepoListPage />} />
       <Route path="/repos/:id" element={<RepoDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
