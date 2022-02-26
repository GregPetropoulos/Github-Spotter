import React from 'react'

const Home = () => {
  return (
    <div>

<h1 className="text-6xl">Welcome</h1>
{process.env.REACT_APP_KEY}
    </div>
  )
}

export default Home