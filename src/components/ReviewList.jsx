import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews, patchReviewVote } from "../utils/api";
import moment from "moment";
import thumbblue from "../images/thumb-blue.png";

function Reviewlist() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    getReviews(category).then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
      setLoading(false);
    });
  }, [category]);
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
                  <div className="reviewlist--author-category-box">
                    <p className="reviewlist--author">
                      {review.owner} posted&nbsp;
                      {moment(review.created_at).format("MMMM Do YYYY, h:mm a")}
                      .
                    </p>
                    <p className="reviewlist--category">{review.category}</p>
                  </div>

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
                        <img src={thumbblue} alt="thumb up" />
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
