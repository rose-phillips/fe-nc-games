import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getReviews, patchReviewVote } from "../utils/api";
import moment from "moment";

function Reviewlist() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getReviews().then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
      setLoading(false);
    });
  }, []);

  function handleClick(reviewId) {
    navigate(`/reviews/${reviewId}`);
  }

  function handleVote(reviewId) {
    setReviews((currentReviews) => {
      return currentReviews.map((review) => {
        if (review.review_id === reviewId) {
          return { ...review, votes: review.votes + 1 };
        }
        return review;
      });
    });
    patchReviewVote(reviewId).catch((err) => {
      setErr("sorry, please try again");
      setReviews((currentReviews) => {
        return currentReviews.map((review) => {
          if (review.review_id === reviewId) {
            return { ...review, votes: review.votes + 1 };
          }
          return review;
        });
      });
    });
  }

  return loading ? (
    <p>... reviews loading</p>
  ) : (
    <div className="reviewlist">
      <ul className="reviewlist--list">
        {reviews.map((review) => {
          return (
            <div className="reviewlist--reviewbox" key={review.review_id}>
              <li className="reviewlist--game" key={review.review_id}>
                <div className="reviewlist--title-author-box">
                  <p className="reviewlist--author">
                    {review.owner},{" "}
                    {moment(review.created_at, "YYYYMMDD").fromNow()}.
                  </p>

                  <p className="reviewlist--body">
                    <span className="reviewlist--title">"{review.title}"</span>
                    <br></br>
                    {review.review_body}
                  </p>
                </div>

                <button
                  onClick={() => handleClick(review.review_id)}
                  className="reviewlist--button"
                >
                  Read more
                </button>

                <img
                  className="reviewlist--img"
                  src={review.review_img_url}
                  alt={review.designer}
                />

                <div className="reviewlist--comment-vote-box">
                  <div className="reviewlist--comments-box">
                    <p className="reviewlist--comments">
                      {review.comment_count} comments
                    </p>
                  </div>
                  <div className="reviewlist--votes-box">
                    <p className="reviewlist--votes">
                      <button
                        onClick={() => handleVote(review.review_id)}
                        className="reviewlist--button-upvote"
                      >
                        👍
                      </button>
                      {review.votes}
                    </p>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Reviewlist;
