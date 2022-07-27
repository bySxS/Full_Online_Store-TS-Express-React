import React, { FC } from 'react'
import { Helmet } from 'react-helmet'

interface HomeProps {
  name: string
}

const Home: FC<HomeProps> = ({ name }) => {
  return (
    <div>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content="My First Store - {name}" />
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <div className="font-bold">{name}</div>
    </div>
  )
}

export default Home
