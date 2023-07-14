// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render, screen } from '@testing-library/react'
import Ratings from '../components/ratings/Ratings';
import App from '../App';
import RatingsAndReviews from '../components/ratings/RatingsAndReviews';

describe('Ratings Component', () => {
  it('it should render the ratings and reviews component', () => {
    render(<RatingsAndReviews/>)
  })
})
