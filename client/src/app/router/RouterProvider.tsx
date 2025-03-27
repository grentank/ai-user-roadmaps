import { type JSX } from 'react';
import { Route, Routes } from 'react-router';
import { AuthStatus } from '../../features/auth/model/types';
import AddPlacePage from '../../pages/AddPlace/AddPlacePage';
import AllRoadmaps from '../../pages/AllRoadmaps/AllRoadmaps';
import DefaultErrorPage from '../../pages/DefaultError/DefaultErrorPage';
import LoginPage from '../../pages/Login/LoginPage';
import MainPage from '../../pages/Main/MainPage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import Layout from '../../pages/PageLayout/Layout';
import RoadmapPage from '../../pages/Roadmap/RoadmapPage';
import SignUpPage from '../../pages/SignUp/SignUpPage';
import ProtectedRoute from '../../shared/lib/ProtectedRoute';
import { useAppSelector } from '../../shared/lib/reduxHooks';

export default function RouterProvider(): JSX.Element {
  const status = useAppSelector((store) => store.auth.status);
  return (
    <Routes>
      <Route errorElement={<DefaultErrorPage />} element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/places/add"
          element={
            <ProtectedRoute redirectTo="/login" isAllowed={status === AuthStatus.AUTHORIZED}>
              <AddPlacePage />
            </ProtectedRoute>
          }
        />
        <Route path="/roadmaps" element={<AllRoadmaps />} />
        <Route path="/users/:userId/roadmap" element={<RoadmapPage />} />
        <Route element={<ProtectedRoute isAllowed={status === AuthStatus.GUEST} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
