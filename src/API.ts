import { QueryResponseType } from "./Types";


const url = 'http://localhost:5000/api/';

export async function getQuery() {
  console.log("calling getQuery");
  try {
    const response: QueryResponseType = await (await (fetch(`${url}`))).json();
    return response;
  } catch (error) {
    console.error("Error in getQuery:", error);
    return null;
  }
}

export async function writeAnswer(answer: string, id: string) {
  console.log('calling writeAnswer');
  try {
    const response = await (await fetch(`${url}/answer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({answer})
    })).json();
    return response;
  }
  catch (error) {
    console.error("Error in answerQuery", error);
    return null;
  }
}