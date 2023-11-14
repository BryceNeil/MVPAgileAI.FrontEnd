import { API_URL } from "../consts";

// Replace w/ a localstorage system
export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWM3OWUwNGEtNDkxZi00NGVjLThlZGEtODJjNzA0NjAyOGM0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNzMwNzQ4NTM4fQ.CYJVqP96PCZD1SxqCVHokkXqXEbTrEuWRbfrkeTBVBI"

export const getUserProfile = async () => {
    const res = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (res.ok) {
        console.log("AUTHED")
        return await res.json();
    } else {
        return null;
    }
}

{ /* overall case object */}
export const getCase = async (inputValue) => {
  try {
    const response = await fetch(
      `${API_URL}/content/create/case`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/plain'
        },
        body: inputValue
      }
    );

    if (!response.ok) {
      console.error('Server responded with status:', response.status);
      const errorBody = await response.json();
      console.error('Error body:', errorBody);
      return null;
    }

    const responseData = await response.json();
    // Assuming the JSON string is in responseData.choices[0].message.content
    const caseData = responseData.choices[0].message.content;
    console.log("RETURNED: ", JSON.parse(caseData));
    return JSON.parse(caseData); // Parse the JSON string to get the actual object
  } catch (error) {
    console.error('Error making the request:', error);
    return null;
  }
};




export const getCases = async () => {
  const res = await fetch(`${API_URL}/content/cases`);
  if (res.ok) {
    return await res.json();
  } else {
    // Error handling goes here
  }
};

export const getCaseQuestions = async (caseId: string) => {
  const res = await fetch(`${API_URL}/content/case/${caseId}`);
  if (res.ok) {
    return await res.json();
  } else {
    // Error handling goes here
  }
};

export const getChatHistory = async(questionId: string) =>{
  const res = await fetch(`${API_URL}/content/question/${questionId}/chat`);
  if (res.ok) {
    return await res.json()
  } else {
    return []
  }
}


// Mutations

type MutationType = {
    questionId: string, userId: string, token: string, answer: string
}
export const sendAnswer = async (m: MutationType)=>{
    console.log(m)
    const res = await fetch(`${API_URL}/content/answer`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            questionId: m.questionId,
            userId: m.userId,
            answer: m.answer
        })
    })

    if (res.ok) {
        return await res.json() 
    } else {
        return null
    }
}