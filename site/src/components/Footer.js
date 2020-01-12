import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer container">
      <p>&copy; {currentYear} buyxiny.com</p>
      <ul>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
