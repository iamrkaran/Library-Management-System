import React from 'react'

import AdminDashbord from './AdminDashbord';





const Home = () => {
  // const isLoggedIn = useSelector(state => state.isLoggedIn);

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn);
  return (
    <div>
      <AdminDashbord />
    </div>
  )
}

export default Home