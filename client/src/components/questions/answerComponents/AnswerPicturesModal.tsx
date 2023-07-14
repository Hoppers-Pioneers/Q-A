import { CardContent, FormControl, Modal, Typography } from "@mui/joy";
import { Card, Fade, Button, FormLabel, TextField, Stack } from "@mui/material";
import { useCallback, useState } from "react";

type AnswerPicturesModalProps = {
  pictures: string[];
  setPictures: (value: string[]) => void;
  picturesModal: boolean;
  setPictuesModal: (value: boolean) => void;
};

export default function AnswerPicturesModal(props: AnswerPicturesModalProps) {
  const handleClose = () => {
    //closes the modal
    props.setPictuesModal(false);
  };
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const picturesArray: string[] = [];
  const validPicture = new RegExp(
    "^(http(s?):)([/.\\w\\s-])*.(?:jpg|gif|png)",
    "i"
  );

  const mapCurrentPictures = useCallback(() => {
    // console.log("I RENDERED PICTURES");
    return picturesArray.map((picture) => {
      return (
        <img
          src={picture}
          onClick={() => {
            picturesArray.splice(picturesArray.indexOf(picture), 1);
          }}
          />
      );
    });
  }, [picturesArray]);

  return (
    <Modal
      className={"Questions Modal"}
      open={props.picturesModal}
      onClose={handleClose}
    >
      <Fade in={props.picturesModal}>
        <Card variant="outlined" className={"Questions Modal"}>
          <Typography level="h2" fontSize="x1">
            Please Input your Pictures
          </Typography>
          <CardContent>
            <FormControl>
              <FormLabel>Pictures</FormLabel>
              <TextField
                defaultValue={""}
                onChange={(e) => {
                  setPictureUrl(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  if (picturesArray.length > 4) {
                    alert("You can have a maximum of 5 pictures");
                  } else if (validPicture.test(pictureUrl)) {
                    // console.log('the picture url was added to the array');
                    picturesArray.push(pictureUrl);
                    // console.log('THIS IS THE PICTURES ARRAY', picturesArray)
                  }
                }}
              >
                Add Picture
              </Button>
            </FormControl>
            <Stack direction="row">{mapCurrentPictures()}</Stack>
            <Button
              type="submit"
              onClick={() => {
                props.setPictures(picturesArray);
                props.setPictuesModal(false);
              }}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
}
