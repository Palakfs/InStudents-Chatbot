import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Groq } from "groq-sdk";
import { streamData } from '../data';
import counsellor_avatar from '../components/counsellor_avater.jpeg';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}

interface UserInfo {
  name?: string;
  country?: string;
  grade: string;
  stream?: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('name');
  const [setupComplete, setSetupComplete] = useState(false);

  // Initialize chat on component mount
  React.useEffect(() => {
    setMessages([{ 
      type: 'bot', 
      content: "Hi! I'm Emma, your career advisor. 🌟 I'm here to help you explore exciting career paths! First, what's your name?" 
    }]);
  }, []);

  const handleSetupQuestion = async (userInput: string) => {
    if (!userInfo || !setupComplete) {
      switch (currentQuestion) {
        case 'name':
          setUserInfo({ name: userInput, country: '', grade: '' });
          setCurrentQuestion('country');
          return "Nice to meet you, " + userInput + "! 😊 Which country are you from?\n\n1. India 🇮🇳\n2. United Kingdom 🇬🇧\n\nPlease type 1 or 2.";
        
        case 'country':
          const country = userInput === '1' ? 'India' : userInput === '2' ? 'United Kingdom' : '';
          if (!country) {
            return "Please select either 1 for India or 2 for United Kingdom.";
          }
          setUserInfo(prev => prev ? { ...prev, country } : null);
          setCurrentQuestion('grade');
          
          if (country === 'India') {
            return "Which class are you in?\n\n1. Class 9-10\n2. Class 11-12\n\nPlease type 1 or 2.";
          } else {
            return "Which year are you in?\n\n1. Year 9-11\n2. Year 12-13\n\nPlease type 1 or 2.";
          }
        
        case 'grade':
          const isIndia = userInfo?.country === 'India';
          let grade = '';
          
          if (isIndia) {
            grade = userInput === '1' ? 'Class 9-10' : userInput === '2' ? 'Class 11-12' : '';
          } else {
            grade = userInput === '1' ? 'Year 9-11' : userInput === '2' ? 'Year 12-13' : '';
          }
          
          if (!grade) {
            return "Please select either 1 or 2 for your grade.";
          }

          const updatedInfo = {
            ...userInfo,
            grade
          };
          setUserInfo(updatedInfo);
          setSetupComplete(true);
          
      
          logUserData(updatedInfo);
          
          return `Perfect! 🎓 Now I know you better, ${updatedInfo.name}. Feel free to ask me any questions about your career options, educational paths, or future opportunities.`;
      }
    }

    return await getAIResponse(userInput);
  };

  const logUserData = (userData: UserInfo) => {
  
    console.log('User session logged:', userData);
  };

  const getAIResponse = async (userInput: string) => {
    if (!userInfo) return "I'm sorry, but I need to know a bit about you first.";

    try {
      setIsLoading(true);

      const systemPrompt = `You are Emma, a friendly and professional career counselor for students. Your personality is warm, encouraging, and supportive, but you maintain professional boundaries.

      Current student information:
      Name: ${userInfo.name}
      Country: ${userInfo.country}
      Grade: ${userInfo.grade}

      IMPORTANT GUIDELINES:
      1. Always maintain a professional, child-safe environment
      2. Never provide advice about non-academic or non-career topics
      3. Refuse to engage with inappropriate questions
      4. Focus solely on educational and career guidance
      5. Use age-appropriate language and examples
      6. Include emojis occasionally to maintain a friendly tone
      7. Provide country-specific advice based on the education system in ${userInfo.country}

      For India:
      - Classes 9-10: Focus on stream selection (Science, Commerce, Arts) and foundation building
      - Classes 11-12: Focus on college preparation, entrance exams, and career paths
      
      For UK:
      - Years 9-11: Focus on GCSE choices, A-Level preparation, and career exploration
      - Years 12-13: Focus on university applications, A-Levels, and specific career paths

      When suggesting careers:
      1. Focus on ${userInfo.country}-specific:
         - Educational requirements
         - University options
         - Career paths
         - Industry demand
      2. Include:
         - Required qualifications
         - Key skills needed
         - Top universities in ${userInfo.country}
         - Future prospects
      3. Consider the student's age and grade level
      4. Provide practical next steps they can take

      Reference career data: ${JSON.stringify(streamData)}

      Remember to:
      1. Tailor advice to ${userInfo.grade} level
      2. Focus on ${userInfo.country} education system
      3. Provide age-appropriate guidance
      4. Include specific, actionable steps`;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInput }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 800,
      });

      return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try asking your question differently.";
    } catch (error) {
      console.error('AI Error:', error);
      return "I'm having trouble processing your question. Please try again.";
    } finally {
      setIsLoading(false);
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

    const botResponse = await handleSetupQuestion(input);
    setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4 p-3 bg-indigo-50 rounded-lg">
        <div className="flex items-center gap-4">
          <img 
            src="https://static.wixstatic.com/media/69bd52_48ec0c1bca01434d85faf02f2549ca3e~mv2.png/v1/crop/x_44,y_82,w_758,h_252/fill/w_188,h_63,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/InStudents%20(1)(1).png"
            alt="InStudents Logo"
            className="h-8 object-contain"
          />
          <div>
          <h1 className="text-l font-semibold text-indigo-900">Powered by InStudents</h1>
          </div>
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
          placeholder={isLoading ? "Emma is thinking..." : "Type your message..."}
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
