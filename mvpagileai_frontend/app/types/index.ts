"use client"
import { UseMutateFunction } from "@tanstack/react-query";

export type User = {
    user_id: string;
    email: string;
    password: string;
}

export type IUseSignUp = UseMutateFunction<User, unknown, {
    email: string;
    password: string;
  }, unknown>

export type MessageType = {
    from: string;
    text: string;
}

// Assuming defined types
export type Step = {
  stepNumber: number;
  description: string;
  details: string;
};

export type Question = {
  questionNumber: number;
  questionId: string;
  question: string;
  difficultyLevel: string;
  relevantSkills: string[];
  rubric: {
      criterion: string;
      description: string;
      weight: number;
  }[];
  framework: {
      overview: string;
      steps: Step[]; // Assuming you have Step defined
  };
};

export type CaseData = {
  jobTitle: string;
  scenario: string;
  caseId: string;
  questions: Question[];
};