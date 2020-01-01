import React from "react"
import PropTypes from "prop-types"
import { DiscussionEmbed } from "disqus-react"

const Comments = ({ identifier, title }) => {
  const disqusShortname = process.env.GATSBY_DISQUS_SHORTNAME
  const disqusConfig = {
    identifier: identifier,
    title,
  }

  return (
    <div className="comments">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}

Comments.propTypes = {
  identifier: PropTypes.string,
  title: PropTypes.string,
}

export default Comments
