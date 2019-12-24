import React from "react"

// import Layout from "../components/Layout"
import SEO from "../components/SEO"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <div className="container">
      <h1>Uh oh! Page not found</h1>
      <p>
        You just found a URL that doesn&#39;t exist... the sadness.{" "}
        <span role="img" aria-label="sad face">
          😔
        </span>
      </p>
    </div>
  </>
)

export default NotFoundPage
