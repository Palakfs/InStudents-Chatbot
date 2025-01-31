export type Stream = 'science-maths' | 'science-bio' | 'commerce' | 'arts';
export type Grade = '9-10' | '11-12';

export interface Career {
  title: string;
  description: string;
  requirements: string[];
  colleges: string[];
  scope: string;
}

export interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}

export interface StreamInfo {
  name: string;
  description: string;
  careers: Career[];
}

export type ChatMode = 'structured' | 'freeform';
export type ChatState = 'initial' | 'grade-selection' | 'stream-selection' | 'career-info' | 'freeform';