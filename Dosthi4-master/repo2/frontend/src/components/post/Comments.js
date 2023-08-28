import React from "react";
import Moment from "react-moment";

function Comments({ comments }) {
  return (
    <div className="comment">
        <img src={comments.commentBy.picture} alt="" className="comment_img" />
      <div className="comment_col_1">

        <div className="comment_wrap">
          <div className="comment_name">
            {comments.commentBy.first_name} {comments.commentBy.last_name}

          </div>
          <div className="comment_text">
            {comments.comment }
          </div>
        </div>
          {comments.image && (
            <img src={comments.image} alt="" className="comment_image" />

          )}
          <div className="comment_action">
            <span>Like</span>
            <span>Reply</span>
            <span>
            <Moment fromNow interval={30}>
                {comments.commentAt}
              </Moment>
            </span>
          </div>
        </div>
      </div>
  );
}

export default Comments;
