import React from "react"

// <a href="https://www.freevector.com/grocery-shopping-29573">FreeVector.com</a>
import heroImage from "../assets/img/shopping.svg"

const Hero = () => {
  return (
    <div className="hero">
      <div className="copy">
        <h1>Find products from your home countries, when living abroad.</h1>
        <p>
          We understand how difficult it can be living away from home. That's
          why we created buy X in Y; where X can be any product, and Y can be in
          any country. For example: "Where to buy{" "}
          <span className="hl">marmite</span> in{" "}
          <span className="hl">Finland</span>".
        </p>
        <p className="cta">
          <a className="btn big" href="#countries">
            Start shopping
          </a>
        </p>
      </div>
      <div className="img">
        <img src={heroImage} alt="" />
      </div>
    </div>
  )
}

export default Hero
