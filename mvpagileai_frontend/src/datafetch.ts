import { API_URL } from "../consts";

// Replace w/ a localstorage system
export const token = ""

export const getUserProfile = async (accessToken: string = '') => {
    const res = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (res.ok) {
        console.log("AUTHED")
        return await res.json();
    } else {
        return null;
    }
}
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