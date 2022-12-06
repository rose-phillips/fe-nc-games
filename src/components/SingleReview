import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleReview } from "../utils/api";
import moment from "moment";

function SingleReview() {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});

  useEffect(() => {
    getSingleReview(review_id).then((singleReviewFromApi) => {
      setSingleReview(singleReviewFromApi);
    });
  }, [review_id, singleReview]);

  return (
    <main className="singlereview">
      <div className="singlereview--owner-category-box">
        <div className="singlereview--owner-box">
          <p className="singlereview--owner">
            reviewed by: {singleReview.owner},{" "}
            {moment(singleReview.created_at, "YYYYMMDD").fromNow()}.
          </p>
        </div>
        <div className="singlereview--category-box">
          <p className="singlereview--votes">
            category: {singleReview.category}
          </p>
        </div>
      </div>

      <figure className="singlereview--figure-box">
        <img
          className="singlereview--img"
          src={singleReview.review_img_url}
          alt={singleReview.title}
        />
        <figcaption className="singlereview--figcaption">
          game designer: {singleReview.designer}
        </figcaption>
      </figure>

      <h2 className="singlereview--title">{singleReview.title}</h2>
      <p className="singlereview--body">{singleReview.review_body}</p>

      <div className="singlereview--comment-vote-box">
        <div className="singlereview--comments-box">
          <p className="singlereview--comments">
            {singleReview.comment_count} comments
          </p>
        </div>
        <div className="singlereview--votes-box">
          <p className="singlereview--votes">👍 {singleReview.votes}</p>
        </div>
      </div>
      <div className="singlereview--comment-box">
        <p>...comments will go here</p>
      </div>
    </main>
  );
}

export default SingleReview;
