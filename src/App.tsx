
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Instudents Chatbot</h1>
          <p className="text-gray-600">Your AI companion for exploring career paths in India</p>
        </div>
        <ChatBot />
      </div>
    </div>
  );
}

export default App;