import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews, patchReviewVote } from "../utils/api";
import moment from "moment";
import thumbblue from "../images/thumb-blue.png";
import up from "../images/up.png";
import down from "../images/down.png";

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

  function handleVote(reviewId, event) {
    setReviews((currentReviews) => {
      return currentReviews.map((review) => {
        if (review.review_id === reviewId) {
          event.disabled = true;
          console.log(event.disabled);
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
      <form className="sort-form" action="">
        <label htmlFor="">sort by: </label>

        <select
          name="sort"
          id="sort"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="created_at">date posted</option>
          <option value="title">title</option>
          <option value="votes">votes</option>
          <option value="comment_count">comments</option>
        </select>
      </form>
      &nbsp;&nbsp;
      <button value="ascending" onClick={(e) => handleOrder(e.target.alt)}>
        <img className="icon" src={up} alt="ascending" />
      </button>
      &nbsp;&nbsp;
      <button value="descending" onClick={(e) => handleOrder(e.target.alt)}>
        <img className="icon" src={down} alt="descending" />
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
                      {moment(review.created_at).format("ll")}
                    </p>
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
                        disabled
                        onClick={(e) =>
                          handleVote(review.review_id, e.currentTarget)
                        }
                        className="reviewlist--button-upvote"
                      >
                        <img src={thumbblue} alt="upvote" />
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
