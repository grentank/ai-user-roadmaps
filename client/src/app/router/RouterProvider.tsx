import { type JSX } from 'react';
import { Route, Routes } from 'react-router';
import AddPlacePage from '../../pages/AddPlace/AddPlacePage';
import AllRoadmaps from '../../pages/AllRoadmaps/AllRoadmaps';
import DefaultErrorPage from '../../pages/DefaultError/DefaultErrorPage';
import MainPage from '../../pages/Main/MainPage';
import NotFoundPage from '../../pages/NotFound/NotFoundPage';
import Layout from '../../pages/PageLayout/Layout';
import RoadmapPage from '../../pages/Roadmap/RoadmapPage';

export default function RouterProvider(): JSX.Element {
  return (
    <Routes>
      <Route errorElement={<DefaultErrorPage />} element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/places/add" element={<AddPlacePage />} />
        <Route path="/roadmaps" element={<AllRoadmaps />} />
        <Route path="/users/:userId/roadmap" element={<RoadmapPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
