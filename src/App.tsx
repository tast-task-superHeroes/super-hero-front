import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import { HeroesPage } from './components/HeroesPage';
import { HeroPage } from './components/HeroPage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HeroesPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/hero/:heroId" element={<HeroPage />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </main>
  );
}
