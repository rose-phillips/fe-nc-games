import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getReviews } from "../utils/api";

function Reviewlist() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
                    review by: {review.owner}
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
                    <p className="reviewlist--comments">0 comments</p>
                  </div>
                  <div className="reviewlist--votes-box">
                    <p className="reviewlist--votes">👍 0</p>
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
