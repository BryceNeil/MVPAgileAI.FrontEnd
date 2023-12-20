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

export type CaseData = {
    jobTitle: string;
    scenario: string;
    caseId: string;
    questions: {
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
        steps: {
          stepNumber: number;
          description: string;
          details: string;
        }[];
      };
    }[];
  };