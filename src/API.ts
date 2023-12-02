import { QueryResponseType } from "./Types";


const url = 'http://localhost:5000/api/';

export async function getQuery() {
  console.log("calling getQuery");
  try {
    const response: Omit<QueryResponseType, 'answer'> = await (await (fetch(`${url}`))).json();
    return response;
  } catch (error) {
    console.error("Error in getQuery:", error);
    return null;
  }
}

export async function answerQuery(answer: string, id: string) {
  console.log('calling writeAnswer');
  try {
    const response: QueryResponseType = await (await fetch(`${url}/answer/${id}`, {
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

export async function createQuery(query: string, answer: string) {
    console.log("creating query: ", query, answer);
    try {
        const response = await (
            await fetch(`${url}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query,
                    answer,
                }),
            })
        ).json();
    } catch (error) {
        console.error("Error in createQuery", error);
        return null;
    }
}