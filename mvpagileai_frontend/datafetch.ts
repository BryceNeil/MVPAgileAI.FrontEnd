import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "./consts";
import { CaseData } from "@/app/types"
import { User, IUseSignUp  } from '@/app/types';
// Replace w/ a localstorage system

export const token = "dhbcjhbehhbf"

export async function signUp (email: string, password: string, confirmPassword: string): Promise<User> {
  if (password !== confirmPassword){
    throw new Error("Passwords do not match")
  } else {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    if (!response.ok)
      throw new Error('Failed on sign up request');
    return await response.json()
    
  }
}



export const getUserProfile = async (accessToken: string = '') => {
    const res = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (res.ok) {
        console.log("GETTING PROFILE");
        return await res.json();
    } else {
        return null;
    }
}

export const getCase = async (inputValue: string) => {
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

    const caseData = await response.json();
    //console.log("RETURNED: ", caseData);
    const parseCaseData = JSON.parse(caseData);
    return parseCaseData; // Directly return the parsed JSON object
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

export const enterNewCase = async(caseData: CaseData, userId?: string)=> {
  const bodyData = { caseData, userId}
  const response = await fetch(`${API_URL}/content/enter/case`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })
  if (!response.ok)
    throw new Error('Failed to Enter case');
  
  return await response.json()
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
