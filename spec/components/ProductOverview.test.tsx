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