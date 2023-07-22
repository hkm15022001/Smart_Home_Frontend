import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LayoutApp from '../components/layout/Layout';
import Loading from '../components/common/Loading';

const Home = lazy(() => import('../components/home/Home'));
const Room = lazy(() => import('../components/room/Rooms'));
const DetailRoom = lazy(() => import('../components/room/detailRoom/DetailRoom'));
const Device = lazy(() => import('../components/device/Devices'));
const Profile = lazy(() => import('../components/profile/Profile'));
const MeterPower = lazy(() => import('../components/meterPower/MeterPower'));

function MainAppRoutes(props) {
  return (
    <LayoutApp>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/rooms" element={<Room />}></Route>
          <Route path="/rooms/:id" element={<DetailRoom />} />
          <Route path="/devices" element={<Device />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meter-power" element={<MeterPower />} />
        </Routes>
      </Suspense>
    </LayoutApp>
  );
}

export default MainAppRoutes;
