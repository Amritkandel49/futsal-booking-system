import React from 'react';

function UserHome({ currentUser }) {
    // console.log(currentUser);
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-full'>
      <div className='m-auto text-center'>
        <h1 className='text-white text-center text-7xl m-auto py-5'>
          Hello! <span className='text-customYellow'>{currentUser.fullname}</span>
        </h1>
        <h2 className='text-center text-5xl m-auto'>You can access user's features from the sidebar.</h2>
      </div>
    </div>
  );
}

export default UserHome;
