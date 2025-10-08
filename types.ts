
export enum View {
  LANDING,
  DASHBOARD,
  CHAT,
  PREDICTION,
  RESEARCH,
  UPLOAD,
  BIAS,
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface CasePrediction {
    prediction: string;
    reasoning: string;
    confidenceScore: number;
}
