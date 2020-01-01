import React from "react"
import PropTypes from "prop-types"
import { DiscussionEmbed, CommentEmbed } from "disqus-react"

const Comments = ({ identifier, title }) => {
  const disqusShortname = process.env.GATSBY_DISQUS_SHORTNAME
  const disqusConfig = {
    identifier: identifier,
    title,
  }

  return (
    <div className="comments">
      <CommentEmbed showMedia={true} height={160} />
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}

Comments.propTypes = {
  identifier: PropTypes.string,
  title: PropTypes.string,
}

export default Comments
