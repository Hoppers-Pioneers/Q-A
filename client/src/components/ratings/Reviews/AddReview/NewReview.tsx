// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Documentation on Modal: https://mui.com/material-ui/react-modal/
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Fade,
  Modal,
  Card,
  Divider,
  CardContent,
  Rating,
  Stack,
  Checkbox,
} from "@mui/material";
import { Typography, Tooltip, Button } from "@mui/joy";
import PhotosModal from "./PhotosModal";
import CharacteristicsList from "./CharacteristicsList";
import InputFields from "./InputFields";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const NewReview = ({
  setIsWriting,
  isWriting,
  productRatings,
  itemId,
  fetchReviews,
  reviewParams,
}) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [addingPhotos, setAddingPhotos] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  const handleClose = () => {
    setIsWriting(false);
  };

  const style = {
    display: 'flex',
    flexDirection: 'column',
    position: "absolute",
    top: "50%",
    left: "50%",
    maxHeight: "85vh",
    // maxWidth: "100%",
    marginBottom: '10px',
    width: '45%',
    // height: '800px',
    mx: "auto",
    transform: "translate(-50%, -50%)",
    p: 2,
    bgcolor: "background.paper",
    overflowY: 'scroll'
  };

  console.log(productRatings)

  const validation = {
    required: [
      "rating",
      "characteristics",
      "body",
      "name",
      "email",
    ],
    characteristics: (chars) => {
      console.log(chars)
      console.log(Object.keys(productRatings).length)
      return Object.keys(chars).length === Object.keys(productRatings).length || false
    },
    body: (value) => (value.length >= 50 && value.length <= 1000) || false,
    name: (value) => (value.length >= 2 && value.length <= 60) || false,
    email: (value) => {
      const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      return (validEmail.test(value) && value.length <= 60) || false;
    }
  };

  const handleSubmit = (event) => {

    const invalidSubmissions = new Set();

    event.preventDefault();
    let validSubmission = true;
    console.log(formData);
    validation.required.forEach((section) => {
      if (!formData[section]) {
        validSubmission = false;
        invalidSubmissions.add(section)
      }
    })
    for (const section in formData) {
      if (validation[section]) {
        const validator = validation[section]
        if (!validator(formData[section])) {
          validSubmission = false;
          invalidSubmissions.add(section)
        }
      }
    }
    console.log(invalidSubmissions)
    if (validSubmission) {
      axios
        .post(
          `http://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews`,
          formData,
          {
            headers: {
              Authorization: import.meta.env.VITE_AUTH_TOKEN,
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          fetchReviews(reviewParams);
          setIsWriting(false);
        })
        .catch((error) => {
          console.error("There was an error:", error.response.data);
        });
    } else {
      setErrorMessage(() => {
        return `Enter a valid: ${[...invalidSubmissions].join(', ')}`
      })
    }
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue,
    });
  };

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      recommend: checked,
    }));
  }, [checked]);

  useEffect(() => {
    setFormData((formData) => ({
      ...formData,
      product_id: itemId,
    }));
  }, [itemId]);

  return (
    <Box>
      <Modal open={isWriting} onClose={handleClose} sx={{ display: 'flex' }}>
        <Fade in={isWriting}>
          <form onSubmit={handleSubmit}>
            <Card variant="outlined" sx={style}>
              <Typography level="h2" fontSize="xl" sx={{ marginBottom: "8px" }}>
                Write Your Review
              </Typography>
              <Divider inset="none" />
              <CardContent>
                <Typography
                  level="body2"
                  textColor="#25252D"
                  sx={{
                    marginBottom: "5px",
                  }}
                >
                  Overall Rating: *
                </Typography>
                <Rating
                  onChange={handleRatingChange}
                  sx={{
                    fontSize: "27px",
                    color: "#525252",
                  }}
                ></Rating>
                <Typography level="body3" textColor="#25252D">
                  Click to rate
                </Typography>
                <Divider sx={{ marginY: "10px" }} />
                <Stack direction="row" sx={{ marginY: "10px" }} spacing="30px">
                  <InputFields
                    name={"Name"}
                    multiline={true}
                    styles={{ flexGrow: 1 }}
                    handleFormChange={handleFormChange}
                  />
                  <InputFields
                    name={"Email"}
                    multiline={true}
                    styles={{ flexGrow: 2 }}
                    handleFormChange={handleFormChange}
                  />
                </Stack>
                <InputFields
                  name={"Summary"}
                  multiline={true}
                  styles={{ marginY: "10px" }}
                  handleFormChange={handleFormChange}
                />
                <InputFields
                  name={"Product Review"}
                  multiline={true}
                  rows={3}
                  styles={{ marginY: "10px" }}
                  handleFormChange={handleFormChange}
                />
                <CharacteristicsList
                  productRatings={productRatings}
                  selectedValues={selectedValues}
                  setSelectedValues={setSelectedValues}
                  formData={formData}
                  setFormData={setFormData}
                />
                <Stack direction="row" alignItems="center" marginTop="8px" spacing={3} justifyContent={'start'}>
                  <Stack direction={'row'} alignItems="center">
                    <Checkbox
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <Typography> Do you recommend this product? *</Typography>
                  </Stack>
                  <Tooltip title={'Add a Photo'}>
                    <AddAPhotoIcon onClick={() => setAddingPhotos(true)}/>
                  </Tooltip>
                </Stack>
                <Stack direction="row" spacing="20px" overflow="auto">
                  {formData.photos && formData.photos.length > 0
                    ? formData.photos.map((url, index) => {
                        return (
                          <Box
                            component="img"
                            key={index}
                            sx={{
                              border: "1px solid grey",
                              borderRadius: "10px",
                              boxShadow: "0px 1px 6px #e0e0e0",
                              display: "flex",
                              flexDirection: "row",
                              height: 100,
                              width: "auto",
                            }}
                            src={url}
                          ></Box>
                        );
                      })
                    : null}
                </Stack>

                <Box>
                  {addingPhotos ? (
                    <PhotosModal
                      setFormData={setFormData}
                      formData={formData}
                      isWriting={isWriting}
                      setAddingPhotos={setAddingPhotos}
                      style={style}
                      addingPhotos={addingPhotos}
                      setPhotos={setPhotos}
                    />
                  ) : null}
                </Box>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{
                    borderColor: "#e8e4e4",
                    color: "#525252",
                    marginTop: "12px",
                  }}
                >
                  <Button
                    color="neutral"
                    sx={{
                      flex: 1,
                      borderColor: "#e8e4e4",
                      color: "#525252",
                    }}
                    variant="outlined"
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    color="neutral"
                    sx={{
                      flex: 1,
                      borderColor: "#e8e4e4",
                      color: "#525252",
                    }}
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </form>
        </Fade>
      </Modal>
    </Box>
  );
};

export default NewReview;
