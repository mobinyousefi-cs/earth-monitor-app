import { useState } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [aiInput, setAiInput] = useState("");

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = { role: 'user' as const, content: aiInput };
    setAiMessages([...aiMessages, userMessage]);
    
    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: "I'm here to help you with carbon tracking and emission reduction strategies. How can I assist you today?",
      };
      setAiMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setAiInput("");
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-50 hover:scale-110 transition-transform"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[400px] h-[600px] shadow-2xl z-50 flex flex-col animate-fade-in">
          <CardHeader className="border-b bg-primary text-primary-foreground py-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary-foreground/10 text-primary-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <CardDescription className="text-primary-foreground/80">
              Ask me about carbon tracking and sustainability
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Ask me anything about carbon tracking!</p>
                </div>
              ) : (
                aiMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="bg-primary text-primary-foreground rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === 'user' && (
                      <div className="bg-secondary text-secondary-foreground rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAiSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
