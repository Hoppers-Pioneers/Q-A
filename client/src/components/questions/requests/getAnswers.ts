export default function getAnswers(question_id: number) {
  return {
    method: "GET",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions/${question_id}/answers`,
    params: {
      page: 1,
      count: 10000,
    },
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
}
