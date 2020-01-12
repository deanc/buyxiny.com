import React from "react"

// import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Breadcrumb from "../components/Breadcrumb"

import ShareImage from "../assets/img/fbshare.png"

const ContactPage = () => (
  <>
    <SEO
      title="Contact Us"
      description={"Get in touch and let us know your thoughts"}
      image={ShareImage}
    />
    <div className="container">
      <Breadcrumb
        crumbs={[
          {
            label: "Contact Us",
          },
        ]}
      />
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="company"
      >
        <input type="hidden" name="form-name" value="contact" />
        <fieldset>
          <h2>Contact Us</h2>
          <div className="form-row nfhp">
            <label>
              Don’t fill this out if you're human: <input name="company" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Your Name: <input type="text" name="name" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Your Email: <input type="email" name="email" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Message: <textarea name="message"></textarea>
            </label>
          </div>
        </fieldset>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
  </>
)

export default ContactPage
