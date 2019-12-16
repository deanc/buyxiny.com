import React from "react";
// import PropTypes from "prop-types";

// <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by macrovector - www.freepik.com</a>

const Hero = props => {
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
        <img
          src="https://image.freepik.com/free-vector/shopping-supermarket-cart-with-grocery-pictogram_1284-11697.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

Hero.propTypes = {};

export default Hero;
