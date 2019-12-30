import React from "react"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer container">
      <p>&copy; {currentYear} buyxiny.com</p>
    </footer>
  )
}

export default Footer
