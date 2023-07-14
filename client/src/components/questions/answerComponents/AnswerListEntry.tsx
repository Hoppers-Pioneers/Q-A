// import { useState, useEffect } from "react";

import helpfulAnswer from "../requests/helpfulAnswer";
import { Card, Stack, Typography } from "@mui/joy";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import axios from "axios";
import reportAnswer from "../requests/reportAnswer";

type AnswerListEntryProps = {
  answer: {
    answer_id: number;
    body: string;
    date: string;
    answerer_name: string;
    helpfulness: number;
    photos: string[];
  };
};

export default function AnswerListEntry(props: AnswerListEntryProps) {
  const validPhotoUrl = new RegExp(
    "^(http(s?):)([/.\\w\\s-])*.(?:jpg|gif|png)",
    "i"
  );
  const [helpful, setHelpful] = useState<string>("Helpful?");

  const displayUserName = () => {
    // if the userName of the Seller is the same as the userName of the answerer but it in bold
    return props.answer.answerer_name === "Seller" ? (
      <strong>{props.answer.answerer_name}</strong>
    ) : (
      props.answer.answerer_name
    );
  };

  const mappedImages = () => {
    //refactor to somewhat match what the overview pictures do
    return props.answer.photos.map((photo) => {
      if (validPhotoUrl.test(photo)) {
        return (
          <img
            key={props.answer.photos.indexOf(photo)}
            src={photo}
            style={{ maxHeight: "200px" }}
            // onClick={() => {
            //   alert("this needs to be added but should expand the image");
            // }}
          />
        );
      }
    });
  };
  const answerHelpful = () => {
    if (helpful === "Helpful?") {
      axios
        .request(helpfulAnswer(props.answer.answer_id))
        // .then((response) => console.log(response.status, response.statusText));
      setHelpful("Helpful");
    } else {
      console.log("This was already triggered");
    }
  };

  const[reportedStatus, setReportedStatus] = useState<string>('Report');
  const reportAnswerEntry = () => {
    if(reportedStatus === "Report") {
      setReportedStatus("Reported");
      reportRequest()
    }
  }
  const reportRequest = () => {
    axios
    .request(reportAnswer(props.answer.answer_id))
    // .then(()=> {
    //   console.log("Report request sent")
    // })
    .catch(error=>console.log("error in reportRequest",error))
  }
  return (
    <Card className="Questions AnswerListEntry">
      <Typography level="h5">
        <strong>A:</strong>
        {props.answer.body}
      </Typography>
      <Typography level="body3">
        by {displayUserName()},{format(new Date(props.answer.date), "PPP")}|{" "}
        {helpful}{" "}
        <Button
          onClick={() => {
            answerHelpful();
          }}
        >
          yes
        </Button>
        {props.answer.helpfulness} | <Button
        onClick={reportAnswerEntry}
        >report</Button>
      </Typography>
      <Stack direction={"row"}>{mappedImages()}</Stack>
    </Card>
  );
}
