import moment from "moment";

const Comment = ({comment, post}) => {
  return (
    <div className="comment">
      <h6 className="comment-author">
        {comment.userFirstName} {comment.userLastName}
      </h6>
      <p className="comment-text">
        {comment.comment}
      </p>
      <p className="comment-date">{moment(comment.date).fromNow()}</p>
    </div>
  )
}

export default Comment;