import { Button, Card } from "@mui/material";
import AnswerList from "../answerComponents/AnswerList";
import { format } from "date-fns";
import { Typography } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import AnswerModal from "../answerComponents/AnswerModal";
import helpfulQuestion from "../requests/helpfulQuestion";
import axios from "axios";
import getAnswers from "../requests/getAnswers";
import reportQuestion from "../requests/reportQuestion";

type QuestionListEntryProps = {
  searchQuery?: string;
  key: number;
  question: {
    question_id: number;
    question_body: string;
    question_date: string;
    asker_name: string;
    question_helpfulness: number;
    reported: boolean;
    answers: object;
  };
};

type answersType = {
  answer_id: number;
  body: string;
  date: string;
  answerer_name: string;
  helpfulness: number;
  photos: string[];
}[];
export default function QuestionListEntry(props: QuestionListEntryProps) {
  //New Answer Modal Components
  const [answerModal, setAnswerModal] = useState<boolean>(false);
  const renderAnswerModal = useCallback(() => {
    //conditial rendering of AnswerModal
    if (answerModal) {
      return (
        <AnswerModal
          question_id={props.question.question_id}
          answerModal={answerModal}
          setAnswerModal={setAnswerModal}
        />
      );
    }
  }, [answerModal, props.question.question_id]);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [numAnswers, setNumAnswers] = useState<number>(2); //how many answers are being mapped

  //Getting the Answers for Question [and caching]
  const listOfAnswers: answersType = [];
  const [answers, setAnswers] = useState<answersType>([]);
  const answersFromSeller: answersType = [];
  useEffect(() => {
    axios
      .request(getAnswers(props.question.question_id))
      .then((response) => {
        if (response.data.results.length > 0)
        for (const el of response.data.results) {
          if (el.answerer_name === "Seller") {
            answersFromSeller.push(el);
          } else if (!listOfAnswers.includes(el)) {
            listOfAnswers.push(el);
          }
        }
        answersFromSeller.sort((a, b) => b.helpfulness - a.helpfulness);
        listOfAnswers.sort((a, b) => b.helpfulness - a.helpfulness);
        setAnswers(answersFromSeller.concat(listOfAnswers));
      })
      .catch((error) => console.log("ERROR IN GET ANSWERS", error));
  }, [renderAnswerModal]);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //Helpful Button Components
  const [helpful, setHelpful] = useState<string>("Helpful?");
  const helpfulFunction = () => {
    if (helpful !== "Helpful") {
      setHelpful("Helpful");
      helpfulRequest();
    }
  };
  const helpfulRequest = () => {
    // sends that a question was helpful
    axios
      .request(helpfulQuestion(props.question.question_id))
      // .then(() => {
      //   console.log('status sent');
      // })
      .catch((error) => console.log("error in helpful request", error));
  };
  const renderMoreAnswersButton = () => {
    if (answers.length > listOfAnswers.length) {
      return (
        <Button
          onClick={() => {
            setNumAnswers(numAnswers + 2);
          }}
        >
          LOAD MORE ANSWERS
        </Button>
      );
    }
  };
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //report
  const[reportedStatus,setReportedStatus] = useState<string>('Report');
  const reportFunc = () => {
    if(reportedStatus === 'Report') {
      setReportedStatus('Reported');
      reportRequest()
    }
  };
  const reportRequest = () => {
    axios.request(reportQuestion(props.question.question_id))
    // .then(()=> {
    //   console.log("status sent");
    // })
    .catch(error => console.log("error in report question", error))
  }


  return (
    <Card className="Questions QuestionList QuestionListEntry">
      <Card>{renderAnswerModal()}</Card>
      <Typography level="h4">
        <strong>Q:</strong>
        {props.question.question_body}
      </Typography>
      <Typography level="body2"> {props.question.asker_name}  </Typography>
      <Typography level="body2">
        {format(new Date(props.question.question_date), "PPP")}
      </Typography>
      <Typography>
        {helpful}
        <Button onClick={helpfulFunction}> YES </Button>
        <small> {props.question.question_helpfulness} </small> |
        <Button
          onClick={() => {
            setAnswerModal(true);
          }}
        >
          Add Answer
        </Button>
        <Button onClick={reportFunc}>
          {reportedStatus}
        </Button>
      </Typography>
      <AnswerList
        answers={answers.slice(0, numAnswers)}
        numAnswers={numAnswers}
        setNumAnswers={setNumAnswers}
        listOfAnswers={listOfAnswers}
        searchQuery={props.searchQuery}
      />
      {renderMoreAnswersButton()}
    </Card>
  );
}
