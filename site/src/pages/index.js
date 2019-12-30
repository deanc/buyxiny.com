import React from "react"

// import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Hero from "../components/Hero"

import ShareImage from "../assets/img/fbshare.png"

const IndexPage = () => (
  <>
    <SEO 
      title="Find products from your home countries when living abroad" 
      description={"We understand how difficult it can be living away from home. That's why we created buy X in Y; where X can be any product, and Y can be in any country. For example: 'Where to buy marmite in Finland'."} 
      image={ShareImage}
      />
    <div className="container">
      <Hero />
    </div>
  </>
)

export default IndexPage
