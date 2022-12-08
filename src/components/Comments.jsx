import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewComments, postComment } from "../utils/api";
import moment from "moment";
import thumbblue from "../images/thumb-blue.png";

function Comments() {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getReviewComments(review_id).then((commentsFromApi) => {
      setComments([...commentsFromApi]);

      setLoading(false);
    });
  }, [review_id]);

  function handleSubmit(e) {
    e.preventDefault();

    postComment(review_id, newComment).then((commentFromApi) => {
      setNewComment("");
      setComments([...comments, commentFromApi]);
    });
  }

  return loading ? (
    <p>...comments loading</p>
  ) : (
    <div className="comments">
      {/* START COMMENT ADDER */}
      <form className="comment-adder" onSubmit={handleSubmit}>
        <textarea
          placeholder="...what do you think?"
          id="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <br />
        <button>post comment</button>
      </form>
      {/* END COMMENT ADDER */}
      <p className="comments--title">{comments.length} comments</p>

      <ul className="comments--list">
        {comments.map((comment) => {
          return (
            <div className="comments--commentbox" key={comment.comment_id}>
              <li className="comments--comment">
                <p className="comments--author-date">
                  {" "}
                  {comment.author},{" "}
                  {moment(comment.created_at).format("MMMM Do YYYY, h:mm a")}.
                </p>

                <div className="comments--body-votes">
                  <p className="comments--body">{comment.body} </p>
                  <p className="comments--votes">
                    <button className="reviewlist--button-upvote">
                      {" "}
                      <img
                        className="singlereview-thumbsup"
                        src={thumbblue}
                        alt="thumb up"
                      />
                    </button>
                    {comment.votes}
                  </p>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Comments;
