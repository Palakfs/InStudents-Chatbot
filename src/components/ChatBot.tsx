import { useState } from 'react';
import { MessageCircle, Send} from 'lucide-react';
import { Groq } from "groq-sdk";
import { ChatMessage, Stream, ChatMode, ChatState, Grade } from '../types';
import { streamData } from '../data';
import counsellor_avatar from '../components/counsellor_avater.jpeg'

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

const INITIAL_MESSAGE = "Welcome to your career counseling journey! 👋\n\nFirst, please tell me which grade you're in:\n\n1. Grade 9-10\n2. Grade 11-12";
const HELP_MESSAGE = "You're now in help mode! Feel free to ask any specific questions about careers, colleges, or requirements. I'll do my best to help you!\n\nType 'menu' to return to the main menu.";

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', content: INITIAL_MESSAGE }
  ]);

  const [input, setInput] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  
  const [chatState, setChatState] = useState<ChatState>('initial');
  const [chatMode, setChatMode] = useState<ChatMode>('structured');
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatMode = () => {
    setChatMode(prevMode => {
      const newMode = prevMode === 'structured' ? 'freeform' : 'structured';
      const newMessage = newMode === 'freeform' ? HELP_MESSAGE : INITIAL_MESSAGE;
      setMessages(prev => [...prev, { type: 'bot', content: newMessage }]);
      if (newMode === 'structured') {
        setSelectedGrade(null);
        setSelectedStream(null);
        setChatState('initial');
      }
      return newMode;
    });
  };

  const handleGradeSelection = (input: string) => {
    const grade = input === '1' ? '9-10' : input === '2' ? '11-12' : null;
    if (grade) {
      setSelectedGrade(grade);
      if (grade === '9-10') {
        return "Great! What field interests you the most?\n\n1. Science & Technology\n2. Commerce & Business\n3. Arts & Humanities\n4. Medical & Healthcare\n\nOr type 'help' to ask specific questions!";
      } else {
        return "Which stream are you currently pursuing?\n\n1. Science with Mathematics\n2. Science with Biology\n3. Commerce\n4. Arts\n\nOr type 'help' to ask specific questions!";
      }
    }
    return "Please select a valid option (1 or 2)";
  };

  const handleStreamSelection = (input: string) => {
    const streamMap: Record<string, Stream> = {
      '1': 'science-maths',
      '2': 'science-bio',
      '3': 'commerce',
      '4': 'arts'
    };

    const stream = streamMap[input];
    if (stream) {
      setSelectedStream(stream);
      const streamInfo = streamData[stream];
      return `Great choice! Let me tell you about ${streamInfo.name}:\n\n${streamInfo.description}\n\nWould you like to know about:\n1. Career options\n2. College requirements\n3. Future scope\n\nOr type "help" to ask specific questions!`;
    }
    return 'Please select a valid option (1-4) or type "help" for specific questions';
  };

  const handleAIQuestion = async (question: string) => {
    try {
      setIsLoading(true);
      const careerData = Object.values(streamData).flatMap(stream => 
        stream.careers.map(career => ({
          stream: stream.name,
          ...career
        }))
      );

      const systemPrompt = `You are a career counseling expert for Indian students. Use the following career data to provide guidance: ${JSON.stringify(careerData)}
      
      Key guidelines:
      1. Focus on practical, actionable advice
      2. Consider the Indian education system and job market
      3. Be encouraging but realistic
      4. Provide specific examples and requirements
      5. Keep responses concise but informative
      
      If the student's grade or stream is known, tailor the advice accordingly.
      Student's grade: ${selectedGrade || 'unknown'}
      Student's stream: ${selectedStream ? streamData[selectedStream].name : 'unknown'}`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 800,
      });

      return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try asking your question differently.";
    } catch (error) {
      console.error('AI Error:', error);
      return "I'm having trouble processing your question. Please try again or use the structured options.";
    } finally {
      setIsLoading(false);
    }
  };

  

  const handleStructuredMessage = async (userInput: string) => {
    if (userInput.toLowerCase() === 'help') {
      setChatMode('freeform');
      return "You're now in help mode! Feel free to ask any specific questions about careers, colleges, or requirements. I'll do my best to help you!\n\nType 'menu' to return to the main menu.";
    }

    if (!selectedGrade) {
      return handleGradeSelection(userInput);
    }

    if (!selectedStream) {
      return handleStreamSelection(userInput);
    }

    const streamInfo = streamData[selectedStream];
    switch (userInput) {
      case '1':
        return streamInfo.careers.map((career, index) => 
          `${index + 1}. ${career.title}\n${career.description}`
        ).join('\n\n');
      case '2':
        return streamInfo.careers.map((career) => 
          `${career.title}:\n${career.requirements.map(req => `• ${req}`).join('\n')}`
        ).join('\n\n');
      case '3':
        return streamInfo.careers.map((career) => 
          `${career.title}:\n${career.scope}`
        ).join('\n\n');
      default:
        return 'Please select a valid option (1-3) or type "help" for specific questions';
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      type: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    let botResponse: string;

    if (input.toLowerCase() === 'menu') {
      setChatMode('structured');
      setSelectedGrade(null);
      setSelectedStream(null);
      setChatState('initial');
      botResponse = INITIAL_MESSAGE;
    } else {
      botResponse = chatMode === 'structured' 
        ? await handleStructuredMessage(input)
        : await handleAIQuestion(input);
    }

    setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    console.log(chatState);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4 p-3 bg-indigo-50 rounded-lg">
        <div className="flex items-center gap-2">
        <img 
            src="https://static.wixstatic.com/media/69bd52_48ec0c1bca01434d85faf02f2549ca3e~mv2.png/v1/crop/x_44,y_82,w_758,h_252/fill/w_188,h_63,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/InStudents%20(1)(1).png"
            alt="InStudents Logo"
            className="h-8 object-contain"
          />
          <h1 className="text-l font-semibold text-indigo-900">Powered by InStudents</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleChatMode}
            className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {chatMode === 'freeform' ? 'Switch to Menu Mode' : 'Switch to Help Mode'}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
        <img 
            src={counsellor_avatar}
            alt="Chatbot Avatar"
            className="h-15 rounded-full object-contain"
          />
        </div>
        <div className="text-sm text-gray-600">
          Chat with Emma, your AI Career Advisor
        </div>
      </div>


      <div className="h-[500px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.type === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white shadow-md'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.type === 'bot' && (
                  <MessageCircle className="w-5 h-5 mt-1" />
                )}
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={isLoading ? "Thinking..." : "Type your message..."}
          disabled={isLoading}
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
