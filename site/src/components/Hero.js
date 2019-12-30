import React from "react"
import { Link } from "gatsby"

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
          <Link className="btn big" to="/q/finland">
            Start shopping in Finland
          </Link>
          <span className="disclaimer">
            (More countries coming, maybe, one day)
          </span>
        </p>
      </div>
      <div className="img">
        <img src={heroImage} alt="" />
      </div>
    </div>
  )
}

export default Hero
