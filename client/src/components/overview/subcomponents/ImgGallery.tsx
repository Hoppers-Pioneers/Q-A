import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useState, useEffect } from 'react';

const ImgGallery = ({ selectedStyle }) => {
  const [itemStylePhotos, setItemSylePhotos] = useState([{url: ''}]);
  const [mainPicURL, setMainPicURL] = useState("");
  // keep track of which image is selected for mainPicUrl, scrolling thumnails, and highlighting thumbnails
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // isFullscreen state for adding conditional class to mainPic wrapper that ∆s vh and vw to 100
  const [isFullscreen, setIsFullscreen] = useState(false);
  // isExpanded state for crosshair cursor
  const [isExpanded, setIsExpanded] = useState(false);
  // keep track of first image to limit shown thumbnails to 7
  const [firstImageIndex, setFirstImageIndex] = useState(0);
  // zoomLevel state adding conditional class to mainPic that transform based on scale
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    // set item style photos with selected style photos
    setItemSylePhotos(selectedStyle.photos);
    // check if there's a selected style with photos
    if (selectedStyle.photos[selectedImageIndex]) {
      // if yes, then set main pic's url to the selected image's index (with default state of 0)
      setMainPicURL(selectedStyle.photos[selectedImageIndex].url);
    } else {
      // if not, then don't load anything
      setMainPicURL('');
    }
  }, [selectedStyle, selectedImageIndex]);

  const handleNextClick = () => {
    setSelectedImageIndex((prevSelectedImageIndex) => {
      // new index set to prev state keyword + 1.
      // modulo to ensure no counting past length of array of thumbnails
      const newIndex = (prevSelectedImageIndex + 1) % itemStylePhotos.length;
      // check if new thumbnail's index is past the 7 thumbnails showing
      if (newIndex >= firstImageIndex + 7) {
        // if yes, then update first image index state
        setFirstImageIndex(firstImageIndex + 1);
      }
      return newIndex;
    });
  }

  const handlePrevClick = () => {
    setSelectedImageIndex((prevSelectedImageIndex) => {
      const newIndex = (prevSelectedImageIndex - 1 + itemStylePhotos.length) % itemStylePhotos.length;
      if (newIndex < firstImageIndex) {
        setFirstImageIndex(firstImageIndex + 1);
      }
      return newIndex;
    });
  }

  const handleFullscreenClick = () => {
    setIsFullscreen(!isFullscreen);
    setIsExpanded(!isExpanded);

    updateArrowKeyClasses();
  };

  const handleMainPicClick = () => {
    if (!isFullscreen) {
      setIsFullscreen(!isFullscreen);
      setIsExpanded(!isExpanded);
      updateArrowKeyClasses();
    } else {
      handleZoomClick();
    }
  };

  const handleUpClick = () => {
    setFirstImageIndex((prevFirstImageIndex) => {
      // edge case for trying to scroll up when at top
      // check if the prev state for first img index is <= 0
      if (prevFirstImageIndex <= 0) {
        return 0;
      }
      return prevFirstImageIndex -1;
    });
  };

  const handleDownClick = () => {
    setFirstImageIndex((prevFirstImageIndex) => {
      // edge case for trying to scroll past 7 from the end of the array of thumbnails
      // check if the prev state for first img incex is >= 7 units from the end of the array
      if (prevFirstImageIndex >= itemStylePhotos.length - 7) {
        return prevFirstImageIndex;
      }
      return prevFirstImageIndex + 1;
    });
  };

  const handleThumbnailClick = (url, index) => {
    setMainPicURL(url);
    // highlighting and scrolling
    setSelectedImageIndex(index);
  }

  const handleZoomClick = () => {
    if (isExpanded) {
      setZoomLevel(prevZoomLevel => prevZoomLevel === 1 ? 1.5 : 1);
    }
  };

  const updateArrowKeyClasses = () => {
    const leftArrow = document.querySelector('.mainPicArrowLeft');
    const rightArrow = document.querySelector('.mainPicArrowRight');
    const mainPic = document.querySelector('.mainPic');

    if (isFullscreen) {
      mainPic.classList.remove('mainPicFullscreen');
      leftArrow.classList.remove('mainPicArrowLeftFullscreen');
      rightArrow.classList.remove('mainPicArrowRightFullscreen');
    } else {
      mainPic.classList.add('mainPicFullscreen')
      leftArrow.classList.add('mainPicArrowLeftFullscreen');
      rightArrow.classList.add('mainPicArrowRightFullscreen');
    }
  }

  const handleMouseMove = (event) => {
    if (isExpanded && zoomLevel === 1.5) {
      requestAnimationFrame(() => {
        const { left, top, width, height } = event.target.getBoundingClientRect();
        const x = ((event.clientX - left) / width) * 100;
        const y = ((event.clientY - top) / height) * 100;
        // Divide the percentage by a factor to reduce the speed of the panning effect
        const factor = 4; // Adjust this value as needed
        event.target.style.transform = `translate(-${x/factor}%, -${y/factor}%) scale(${zoomLevel})`;
      });
    }
  };

  return (
    <div className="imgContainer">
      {itemStylePhotos.length > 0 ? (
        <>
          <div className="mainPicWrapper"
              // conditional styles for isFullscreen
               style={{
                 width: isFullscreen ? '80vw' : 'auto',
                //  height: isFullscreen ? '80vh' : 'auto',
               }}>
            {/* conditinal classes for isExpanded (crosshair cursor) and zoomLevel */}
            <img className={`mainPic ${isExpanded ? 'mainPicExpanded' : ''} ${zoomLevel === 1.5 ? 'mainPicZoomed' : ''}`}
                 src={mainPicURL}
                 alt="main picture of currently selected style"
                 // transform scale based on zoomLevel
                 style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${zoomLevel})` }}
                 onClick={handleMainPicClick}
                 onMouseMove={handleMouseMove}
                 />
            {(isExpanded && zoomLevel === 1) ? (
              <FullscreenExitIcon
                className='exitFullscreenIcon'
                onClick={handleFullscreenClick}
              />
            ) : (
              <FullscreenIcon
                className='fullscreenIcon'
                onClick={handleFullscreenClick}
              />
            )}

            {selectedImageIndex > 0 && (
              <KeyboardArrowLeftIcon className='mainPicArrowLeft' onClick={handlePrevClick} />
            )}
            {selectedImageIndex < itemStylePhotos.length -1 && (
              <KeyboardArrowRightIcon className='mainPicArrowRight' onClick={handleNextClick} />
            )}

            <div className={`thumbnails ${isExpanded ? 'thumbnailsExpanded' : ''}`}>
              {itemStylePhotos.length > 7 && (
                <>
                  <KeyboardArrowUpIcon className='thumbnailUpArrow' onClick={handleUpClick} />
                </>
              )}
              {itemStylePhotos.slice(firstImageIndex, firstImageIndex + 7).map((photo, index) => {
                return (
                  // conditional class names
                  <img
                    className={
                      // its a thumbnail
                      // is it the selected thumbnail?
                      // is the mainPic expanded?
                      // is the small thumbnail selected?
                      `thumbnail
                      ${index + firstImageIndex === selectedImageIndex ?
                        'selectedThumbnail' : ''}
                      ${isExpanded ?
                        'smallIcon' : ''}
                      ${index === selectedImageIndex && isExpanded ?
                        'selectedIconExpanded' : ''}`}
                    key={index}
                    src={photo.thumbnail_url}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => handleThumbnailClick(photo.url, index)}
                  />
                )
              })}
              {itemStylePhotos.length > 7 && (
                <>
                  <KeyboardArrowDownIcon className='thumbnailDownArrow' onClick={handleDownClick}/>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No photos available.</p>
      )}
    </div>
  )
}


export default ImgGallery;