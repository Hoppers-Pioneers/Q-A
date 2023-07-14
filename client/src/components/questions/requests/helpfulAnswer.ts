export default function helpfulAnswer(answer_id: number) {
  return {
    method: "PUT",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${answer_id}/helpful`,
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
}
