import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews, patchReviewVote } from "../utils/api";
import moment from "moment";
import thumbblue from "../images/thumb-blue.png";

function Reviewlist() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    getReviews(category, sort, order).then((reviewsFromApi) => {
      setReviews(reviewsFromApi);
      setLoading(false);
    });
  }, [category, sort, order]);

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

  function handleSort(sort) {
    setSort(sort);
  }

  function handleOrder(order) {
    if (order === "ascending") {
      setOrder("asc");
    } else {
      setOrder("desc");
    }
  }

  return loading ? (
    <p>... reviews loading</p>
  ) : (
    <div className="reviewlist">
      <form action="">
        <label htmlFor="">sort by: </label>
        <select
          name="query"
          id="query"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="created_at">created_at</option>
          <option value="title">title</option>
          <option value="votes">votes</option>
          <option value="comment_count">comment_count</option>
        </select>
      </form>
      &nbsp;&nbsp;
      <button
        className="reviewlist--sortbutton"
        value="ascending"
        onClick={(e) => handleOrder(e.target.value)}
      >
        ascending
      </button>
      &nbsp;&nbsp;
      <button
        className="reviewlist--sortbutton"
        value="descending"
        onClick={(e) => handleOrder(e.target.value)}
      >
        descending
      </button>
      <ul className="reviewlist--list">
        {reviews.map((review) => {
          return (
            <div className="reviewlist--reviewbox" key={review.review_id}>
              <li className="reviewlist--game" key={review.review_id}>
                <div className="reviewlist--title-author-box">
                  <div className="reviewlist--author-category-box">
                    <p className="reviewlist--author">
                      <span className="underline">{review.owner}</span>&nbsp;
                      {moment(review.created_at).format("MMM Do YYYY, h:mm")}
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
