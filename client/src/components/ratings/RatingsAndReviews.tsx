import Ratings from "./Ratings/Ratings";
import Reviews from "./Reviews/Reviews";
import { useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Divider, Typography } from "@mui/joy";
import requestHandler from "./RequestHandler";
import { ReviewParams } from "./Interfaces"
interface RatingsAndReviewsProps {
  itemId: number;
}

export default function RatingsAndReviews({ itemId }: RatingsAndReviewsProps) {
  const reviewParams = useMemo(() => {
    return {
      page: 1,
      count: 500,
      sort: "relevant",
      product_id: itemId,
    };
  }, [itemId]);

  console.log(itemId)

  const metaParams = useMemo(() => {
    return {
      product_id: itemId,
    };
  }, [itemId]);

  const fetchReviews = (reviewParams: ReviewParams) => {
    requestHandler("GET", "/reviews", reviewParams)
      .then((response) => {
        setAllReviews(response.data.results);
        setShownReviews(response.data.results);
      })
      .catch((err) => console.log("There was an error: ", err));
  };

  useEffect(() => {
    if (itemId) {
      fetchReviews(reviewParams);
    }
  }, [itemId, reviewParams]);

  useEffect(() => {
    if (itemId) {
      requestHandler("GET", "/reviews/meta", metaParams)
        .then((response) => setProductRatings(response.data))
        .catch((err) => console.log(err));
    }
  }, [itemId, metaParams]);

  const [allReviews, setAllReviews] = useState([]);
  const [shownReviews, setShownReviews] = useState([]);
  const [productRatings, setProductRatings] = useState({});

  useEffect(() => {
    setShownReviews(allReviews);
  }, [allReviews]);

  // if (shownReviews.length < 1) {
  //   setShownReviews(allReviews)
  // }

  if (allReviews.length < 1 && shownReviews.length < 1 && !itemId) {
    return (
      <div>Loading</div> // replace with loading symbol
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: 'start',
        justifyContent: "center",
        // width: "auto",
        mx: "15%",
      }}
    >
      <Box sx={{alignSelf: 'start', flex: 1}}>
        <Typography
          level="h3"
          sx={{
            display: "flex",
            marginBottom: "7px",
          }}
        >
          Ratings & Reviews
        </Typography>

      </Box>
      <Divider
          inset="none"
          sx={{
            marginBottom: "5px",
            width: 'auto'
            // alignSelf: 'center'
          }}
        />
      <Stack
        direction="row"
        justifyContent="start"
        alignItems="start"
        spacing="50px"
        sx={{ flex: 1 }}
      >
        <Ratings
          shownReviews={shownReviews}
          allReviews={allReviews}
          setShownReviews={setShownReviews}
          productRatings={productRatings}
        />
        <Reviews
          shownReviews={shownReviews}
          fetchReviews={fetchReviews}
          reviewParams={reviewParams}
          productRatings={productRatings}
          itemId={itemId}
        />
      </Stack>
    </Box>
  );
}
