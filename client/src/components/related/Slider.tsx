import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import React, { useState, useEffect, useRef} from 'react';

const SliderElement = React.forwardRef((props, ref) => {
  return <div ref={ref} onScroll={props.onScroll} onResize={props.onScroll} className="slider-element">{props.children}</div>;
})

function Slider({ children }) {
  const slider = useRef(null);
  const [ slidePos, setSlidePos ] = useState(0);
  const [ slideRightPos, setSlideRightPos ] = useState(100);

  const onScroll = () => {
    setSlidePos(slider.current.scrollLeft);
    if (children.length > 0) {
      setSlideRightPos(slider.current.scrollWidth - (slider.current.scrollLeft + slider.current.offsetWidth));
    }
  }
  const onRight = () => {
    slider.current.scrollLeft +=slider.current.offsetWidth;
  };
  const onLeft = () => {
    slider.current.scrollLeft -= slider.current.offsetWidth;
  };
  useEffect(() => {
    onScroll();
  }, []);
  useEffect(() => {
    onScroll();
  }, [children]);

  return (
    <div className="slider-container">
      <Stack direction='row'>
      <IconButton disabled={slidePos <= 5} sx={{width: '2em', height: '2em', margin: 'auto 0 auto 0'}} onClick={onLeft}><ChevronLeft/></IconButton>
      <SliderElement onScroll={onScroll} ref={slider}>{children}</SliderElement>
      <IconButton disabled={slideRightPos <= 5} sx={{width: '2em', height: '2em', margin: 'auto 0 auto 0'}} onClick={onRight}><ChevronRight/></IconButton>
      </Stack>
    </div>
  );
}

export default Slider;