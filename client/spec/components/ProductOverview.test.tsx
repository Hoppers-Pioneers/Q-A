/*

VITEST EG::::::::::::::::::

import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {
  it('true to be true', () => {
    expect(true).toBe(true);
  });

  it('false to be false', () => {
    expect(false).toBe(false);
  });
});


VITEST+RTL EG:::::::::::::::::

import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App title="React" />);

    screen.debug();

    // check if App components renders headline
  });
});

*/
import * as React from 'react';
import { render, screen } from '@testing-library/react';

import ProductOverview from '../../src/components/overview/subcomponents/ProductOverview';

describe('Product Overview', () => {
  it('renders Product Overview component', () => {
    render(<ProductOverview />)

    screen.debug();
  })

  it('')
})


// import { describe, it, expect } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import ImgGallery from "./subcomponents/ImgGallery";


// it('renders without crashing', () => {
//   render(<ImgGallery />);
// });

// it('displays main image and thumbnail', async () => {
//   render(<ImgGallery />);

//   const mainImage = await screen.findByAltText("main picture of currently selected style")
//   expect(mainImage).toBeInTheDocument()

//   const thumbnail = await screen.findByAltText("Thumbnail 0")
//   expect(thumbnail).toBeInTheDocument()
// });


// it('changes the scale of the main image when zoomLevel changes', async () => {
//   render(<ImgGallery zoomLevel={1.5} />)

//   const zoomedImage = await screen.findByClassName('mainPic')
//   expect(zoomedImage).toHaveStyle({ transform: 'scale(1.5)' })
// })


// it('renders with fullscreen style when isFullscreen is true', async () => {
//   render(<ImgGallery isFullscreen={true} />)

//   const fullscreenDiv = await screen.findByClassName('mainPicWrapper')
//   expect(fullscreenDiv).toHaveStyle({ width: '80vw' })
// })
