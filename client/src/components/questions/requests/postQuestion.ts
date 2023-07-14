export default function postQuestion(
  product_id: number,
  name: string,
  body: string,
  email: string
) {
  return {
    method: "POST",
    url: "https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions",
    data: {
      product_id: product_id,
      name: name,
      email: email,
      body: body,
    },
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
}
