import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { PageLoading } from './components/LoadingSpinner';
import HomePage from './pages/HomePage';

// Lazy-load pages that aren't on the critical path
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const FoodBoxListPage = lazy(() => import('./pages/FoodBoxListPage'));
const FoodBoxDetailPage = lazy(() => import('./pages/FoodBoxDetailPage'));
const CreateFoodBoxPage = lazy(() => import('./pages/CreateFoodBoxPage'));
const MyApplicationsPage = lazy(() => import('./pages/MyApplicationsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/food-boxes" element={<FoodBoxListPage />} />
            <Route path="/food-boxes/:id" element={<FoodBoxDetailPage />} />
            <Route path="/create-food-box" element={<ProtectedRoute><CreateFoodBoxPage /></ProtectedRoute>} />
            <Route path="/my-applications" element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
