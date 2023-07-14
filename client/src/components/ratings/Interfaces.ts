export interface ReviewParams {
  page: number;
  count: number;
  sort: string;
  product_id: number;
}

export interface Review {
  rating: number;
  [key: string]: unknown;
}

export interface ReviewsParams {
  shownReviews: object [];
  reviewParams: {
    sort: string
  };
  productRatings: object;
  fetchReviews: (reviewParams: ReviewParams) => void;
  itemId: number;
}

export interface RatingsProps {
  setShownReviews: (shownReview: object[]) => void;
  shownReviews: Review[];
  productRatings: {
    characteristics: object;
    product_id: object;
    ratings: {
      [key: string]: string;
    };
    recommended: {
      true: number;
      false: number;
    };
  };
}

export interface AddMoreReviewsButtonProps {
  setIsWriting: (isWriting: boolean) => void
}

export interface MoreReviewsButton {
  setNumReviews: (num: number) => void
}