import { Box } from "@mui/material";
import { MoreReviewsButton } from "../../Interfaces";
import { Button } from "@mui/joy";

const MoreReviewsButton = ({ setNumReviews }: MoreReviewsButton) => {
  const handleClick = () => {
    setNumReviews((num) => num + 2);
  };

  return (
    <Box sx={{ flex: 1 }} >
      <Button
        color="neutral"
        onClick={handleClick}
        sx={{
          color: "#525252",
          borderColor: "#e8e4e4",
        }}
        variant="outlined"
      >
        More Reviews
      </Button>
    </Box>
  );
};

export default MoreReviewsButton;
