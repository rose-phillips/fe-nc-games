import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewComments } from "../utils/api";
import moment from "moment";

function Comments() {
  const { review_id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviewComments(review_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
      setLoading(false);
    });
  }, [review_id]);

  return loading ? (
    <p>...comments loading</p>
  ) : (
    <div className="comments">
      <h5 className="comments--title">comments</h5>
      <ul className="comments--list">
        {comments.map((comment) => {
          return (
            <div className="comments--commentbox" key={comment.comment_id}>
              <li className="comments--comment">
                <p className="comments--author-date">
                  {" "}
                  {comment.author},{" "}
                  {moment(comment.created_at, "YYYYMMDD").fromNow()}.
                </p>

                <div className="comments--body-votes">
                  <p className="comments--body">{comment.body} </p>
                  <p className="comments--votes">👍 {comment.votes}</p>
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
