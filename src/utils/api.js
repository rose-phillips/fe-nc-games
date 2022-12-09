import axios from "axios";
const api = axios.create({
  baseURL: "https://shiny-bandanna-deer.cyclic.app/api",
});

export const getCategories = () => {
  return api.get("/categories").then(({ data }) => {
    return data.categories;
  });
};

export const getReviews = (category, sort_by, order_by) => {
  return api
    .get("/reviews", { params: { category, sort_by, order_by } })
    .then(({ data }) => {
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

export const patchReviewVote = (reviewId) => {
  const patchReview = {
    inc_votes: 1,
  };
  return api.patch(`/reviews/${reviewId}`, patchReview).then(({ data }) => {
    return data.review;
  });
};

export const postComment = (reviewId, newCommentBody) => {
  const newComment = {
    username: "weegembump",
    body: newCommentBody,
  };

  return api
    .post(`/reviews/${reviewId}/comments`, newComment)
    .then(({ data }) => {
      return data;
    });
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
