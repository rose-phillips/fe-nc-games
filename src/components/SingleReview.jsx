import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleReview, patchReviewVote } from "../utils/api";
import moment from "moment";
import Comments from "./Comments";
import thumbblue from "../images/thumb-blue.png";

function SingleReview() {
  const { review_id } = useParams();
  const [singleReview, setSingleReview] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    getSingleReview(review_id).then((singleReviewFromApi) => {
      setSingleReview(singleReviewFromApi);
      setLoading(false);
    });
  }, [review_id]);

  function handleVote(reviewId) {
    setSingleReview({ ...singleReview, votes: singleReview.votes + 1 });

    patchReviewVote(reviewId).catch((err) => {
      setErr("sorry, please try again");
      setSingleReview({ ...singleReview, votes: singleReview.votes + 1 });
    });
  }

  return loading ? (
    <p>... review loading</p>
  ) : (
    <main className="singlereview">
      <section className="singlereview--reviewbox">
        <div className="singlereview--owner-category-box">
          <div className="singlereview--owner-box">
            <p className="singlereview--owner">
              <span className="underline">{singleReview.owner}</span>{" "}
              posted&nbsp;
              {moment(singleReview.created_at).format("MMMM Do YYYY, h:mm a")}.
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
          <div className="singlereview--comments-box"></div>

          <div className="singlereview--votes-box">
            <p className="singlereview--votes">
              <button
                onClick={() => handleVote(singleReview.review_id)}
                className="reviewlist--button-upvote"
              >
                {" "}
                <img
                  className="singlereview-thumbsup"
                  src={thumbblue}
                  alt="thumb up"
                />
              </button>
              {singleReview.votes}
            </p>
          </div>
        </div>
      </section>

      <Comments />
    </main>
  );
}

export default SingleReview;
