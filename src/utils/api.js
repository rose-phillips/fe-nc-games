import axios from "axios";
const api = axios.create({
  baseURL: "https://shiny-bandanna-deer.cyclic.app/api",
});

export const getReviews = () => {
  return api.get("/reviews").then(({ data }) => {
    return data.reviews;
  });
};

export const getSingleReview = (reviewId) => {
  return api.get(`/reviews/${reviewId}`).then(({ data }) => {
    return data.review;
  });
};

export const getReviewComments = (reviewId) => {
  return api.get(`/reviews/${reviewId}/comments`).then(({ data }) => {
    return data.comments;
  });
};
