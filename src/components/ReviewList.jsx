import { React, useEffect, useState } from "react";
import { getReviews } from "../utils/api";

function Reviewlist() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
    });
  }, []);

  return (
    <div className="reviewlist">
      <ul className="reviewlist--list">
        {reviews.map((review) => {
          return (
            <div className="reviewlist--reviewbox">
              <li className="reviewlist--game" key={review.review_id}>
                <div className="reviewlist--title-author-box">
                  <p className="reviewlist--title">"{review.title}"</p>
                  <p className="reviewlist--author">
                    review by: {review.owner}
                  </p>
                </div>

                <img
                  className="reviewlist--img"
                  src={review.review_img_url}
                  alt={review.designer}
                />
                <button className="reviewlist--button">Read review</button>

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
