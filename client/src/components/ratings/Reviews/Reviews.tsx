import { useState, useEffect } from "react";
import ReviewsList from "./ReviewsList";
import AddMoreReviewsButton from "./ReviewButtons/AddMoreReviewsButton";
import MoreReviewsButton from "./ReviewButtons/MoreReviewsButton";
import NewReview from "./AddReview/NewReview";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { Typography } from "@mui/joy";
import { ReviewsParams } from "../Interfaces";



const Reviews = ({
  shownReviews,
  reviewParams,
  productRatings,
  fetchReviews,
  itemId,
}: ReviewsParams) => {
  const [numReviews, setNumReviews] = useState<number>(2);
  const [displayedReviews, setDisplayedReviews] = useState<object []>([]);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("relevant");

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    reviewParams.sort = sort;
    fetchReviews(reviewParams);
  }, [sort]);

  useEffect(() => {
    if (shownReviews.length > 0) {
      const additionalReviews = [];
      for (let i = 0; i < numReviews; i++) {
        if (shownReviews[i] !== undefined) {
          additionalReviews.push(shownReviews[i]);
        }
      }
      setDisplayedReviews(additionalReviews);
    }
  }, [shownReviews, numReviews]);

  return (
    <Box
      sx={{
        flexShrink: 1,
        flexGrow: 1,
      }}
    >
      <Typography level="body1" sx={{ display: "inline" }}>
        {shownReviews.length} reviews, sorted by{" "}
      </Typography>
      <FormControl sx={{ minWidth: 100 }} size="small">
        <Select
          variant="standard"
          onChange={handleSortChange}
          value={sort}
          label=""
        >
          <MenuItem value={"relevant"}>relevance</MenuItem>
          <MenuItem value={"newest"}>newest</MenuItem>
          <MenuItem value={"helpfulness"}>helpfulness</MenuItem>
        </Select>
      </FormControl>
      <Box>
        {isWriting ? (
          <NewReview
            reviewParams={reviewParams}
            fetchReviews={fetchReviews}
            itemId={itemId}
            isWriting={isWriting}
            setIsWriting={setIsWriting}
            productRatings={productRatings}
          />
        ) : null}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <ReviewsList reviews={displayedReviews} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <AddMoreReviewsButton setIsWriting={setIsWriting} />
        {displayedReviews.length !== shownReviews.length ? (
          <MoreReviewsButton setNumReviews={setNumReviews} />
        ) : null}
      </Box>
    </Box>
  );
};

export default Reviews;