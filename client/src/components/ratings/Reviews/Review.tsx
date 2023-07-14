import { Box, Card, CardContent, Rating, Stack, Link } from "@mui/material";
import { Typography } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import { format } from "date-fns";
import requestHandler from "../RequestHandler";
// import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ReviewPhotos from "./ReviewPhotos";

interface ReviewProps {
  review: {
    rating: number;
    review_id: number;
    reviewer_name: string;
    date: number;
    recommend: number;
    summary: string;
    body: string;
    response: boolean;
    photos: Photo[];
    helpfulness: number;
  };
}

interface Photo {
  id: number,
  url: string
}

const Review = ({ review }: ReviewProps) => {

  const handleHelpfulClick = (event: MouseEvent) => {
    event.preventDefault();
    requestHandler("PUT", `/reviews/${review.review_id}/helpful`);
  };

  const handleReportClick = (event: MouseEvent) => {
    event.preventDefault();
    requestHandler("PUT", `/reviews/${review.review_id}/report`);
  };

  return (
    <Box>
      <Card
        variant="outlined"
        sx={{
          boxShadow: "1px 1px 6px #e8e4e4",
          display: 'flex'
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            minWidth: "400px"
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating
              value={review.rating}
              readOnly={true}
              size="small"
              precision={0.25}
              sx={{
                color: "#525252",
              }}
            ></Rating>
            <Stack direction="row" alignItems="center">
                <CheckCircleIcon
                  sx={{
                    fontSize: "16px",
                    color: "#525252",
                    marginRight: "4px",
                  }}
                />
              <Typography
                level="body3"
                textColor="#25252D"
                sx={{
                  marginRight: "3px",
                  fontWeight: 425,
                }}
              >
                {" "}
                {review.reviewer_name},{" "}
              </Typography>
              <Typography
                level="body3"
                textColor="#25252D"
                sx={{
                  fontWeight: 425,
                }}
              >
                {" "}
                {format(new Date(review.date), "PPP")}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Typography
              level="h6"
              sx={{
                my: "10px",
              }}
            >
              {review.summary}
            </Typography>
            <Typography
              level="body2"
              textColor="#545454"
              sx={{ marginBottom: "10px" }}
            >
              {review.body}
            </Typography>
            <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
              {review.recommend ? (
                <Stack direction="row" spacing="8px">
                  <CheckIcon fontSize="small" />
                  <Typography level="body2" textColor="#25252D">
                    I recommend this product
                  </Typography>
                </Stack>
              ) : null}
              {!review.response === null ? (
                <Box>
                  <Typography
                    sx={{
                      backgroundColor: "text.secondary",
                    }}
                  >
                    Hello
                  </Typography>
                </Box>
              ) : null}
              <ReviewPhotos photos={review.photos} />
            </Stack>
            <Typography
              level="body3"
              textColor="#25252D"
              sx={{ marginTop: "10px" }}
            >
              Helpful?{" "}
              <Link
                // onMouseEnter={()}
                // onMouseExit
                onClick={handleHelpfulClick}
                color="#25252D"
                fontSize={'11px'}
                href="#"
                underline="always"
                variant="body2"
              >
                Yes
              </Link>{" "}
              ({review.helpfulness}) | {" "}
              <Link
                onClick={handleReportClick}
                color="#25252D"
                fontSize={'11px'}
                href="#"
                underline="always"
                variant="body2"
              >
                Report
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Review;
