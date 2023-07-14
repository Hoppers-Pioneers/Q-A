import { Box } from '@mui/material'
import Review from './Review'

interface ReviewsList {
  reviews: object []
}

const ReviewsList = ({ reviews }: ReviewsList) => {
  // Display 2 reviews initially
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      height: "auto",
      flex: 1,
      flexBasis: '100%',
      overflowY: 'auto'
    }}>
      {reviews.map((review, index) => <Review key={index} review={review}/>
      )}
    </Box>
  )
}

export default ReviewsList;