import { baseURL } from "../global/urls";

export const payStackFn = async ({
  email,
  amount,
}: {
  email: string;
  amount: string;
}) => {
  const url = `${baseURL}/paystack/payment?amount=${amount}&email=${email}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    throw new Error(
      `Request failed with status ${res.status}, ${exactErrorMsg}`
    );
  }

  const data = await res.json();

  console.log("function", data);

  return data;
};
