import { HashRouter, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import DefaulLayout from './component/Layout/DefaulLayout';
import ProfileLayout from './component/Layout/Profilelayout';
import React from 'react';
import { Suspense } from 'react';
import Home from './pages/Home';
import Detailproduct from './pages/Detailproduct';
import Storeproduct from './pages/Storeproduct';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getproducts } from './pages/Detailproduct/productsSlice';
// import { cookie } from './regex';
import { getYourStore } from './pages/Storeproduct/StoreSlice';
const Profile = React.lazy(() => import('./pages/Profile'))
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getproducts())
  }, [dispatch])

  useEffect(() => {
    if (!localStorage.id) {
      return;
    }
    // if (!cookie(document.cookie)) {
    //   return;
    // }
    dispatch(getYourStore())
  },[dispatch])  
  return (
    <HashRouter>
      <Routes>
        <Route path='/detailproduct/:id' element={
          <DefaulLayout>
            <Detailproduct />
          </DefaulLayout>} />

        <Route path='/Astra' element={
          <DefaulLayout>
            <Auth />
          </DefaulLayout>} />
        <Route path='/Store' element={
          <DefaulLayout>
            <Storeproduct />
          </DefaulLayout>} />
        <Route path='/Profile' element={
          <ProfileLayout>
            <Suspense fallback={<p>Loading</p>}>
              <Profile />
            </Suspense>
          </ProfileLayout>} />

        <Route path='/account' element={
          <DefaulLayout>
            <Auth />
          </DefaulLayout>} />
        <Route path='/' element={
          <DefaulLayout>
            <Home />
          </DefaulLayout>} />
        <Route path='*' element={
          <DefaulLayout>
            <Home />
          </DefaulLayout>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
