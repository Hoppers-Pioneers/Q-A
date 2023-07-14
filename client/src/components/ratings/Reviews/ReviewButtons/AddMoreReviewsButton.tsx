import { Box } from "@mui/material";
import { Button } from "@mui/joy";
import { AddMoreReviewsButtonProps } from "../../Interfaces";


const AddMoreReviewsButton = ({ setIsWriting }: AddMoreReviewsButtonProps) => {
  const handleClick = () => {
    setIsWriting(true);
  };
  return (
    <Box>
      <Button
        color="neutral"
        onClick={handleClick}
        variant="outlined"
        sx={{
          color: "#525252",
          borderColor: "#e8e4e4",
        }}
      >
        Add A Review
      </Button>
    </Box>
  );
};

export default AddMoreReviewsButton;
