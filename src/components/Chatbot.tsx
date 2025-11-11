import { useState } from "react";
import { MessageCircle, X, Send, User, Bot, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface SupportTicket {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [supportForm, setSupportForm] = useState<SupportTicket>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [aiInput, setAiInput] = useState("");

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save ticket to localStorage for admin dashboard
    const tickets = JSON.parse(localStorage.getItem("supportTickets") || "[]");
    const newTicket = {
      id: Date.now().toString(),
      ...supportForm,
      status: "open",
      createdAt: new Date().toISOString(),
    };
    tickets.push(newTicket);
    localStorage.setItem("supportTickets", JSON.stringify(tickets));
    
    toast.success("Support ticket submitted successfully! We'll get back to you soon.");
    setSupportForm({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
  };

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
              <CardTitle className="text-lg">Clever Reduction Support</CardTitle>
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
              Get help from our team or AI assistant
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 flex-1 overflow-hidden">
            <Tabs defaultValue="support" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                <TabsTrigger value="support" className="gap-2">
                  <User className="h-4 w-4" />
                  Support Team
                </TabsTrigger>
                <TabsTrigger value="ai" className="gap-2">
                  <Bot className="h-4 w-4" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>

              {/* Support Team Tab */}
              <TabsContent value="support" className="flex-1 overflow-y-auto p-4 mt-0">
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm">First Name</Label>
                      <Input
                        id="firstName"
                        value={supportForm.firstName}
                        onChange={(e) => setSupportForm({ ...supportForm, firstName: e.target.value })}
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                      <Input
                        id="lastName"
                        value={supportForm.lastName}
                        onChange={(e) => setSupportForm({ ...supportForm, lastName: e.target.value })}
                        required
                        className="h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                      required
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm">Company/Group</Label>
                    <Input
                      id="company"
                      value={supportForm.company}
                      onChange={(e) => setSupportForm({ ...supportForm, company: e.target.value })}
                      required
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm">Subject</Label>
                    <Input
                      id="subject"
                      value={supportForm.subject}
                      onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                      required
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm">Message</Label>
                    <Textarea
                      id="message"
                      value={supportForm.message}
                      onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                      required
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Submit Ticket
                  </Button>
                </form>
              </TabsContent>

              {/* AI Assistant Tab */}
              <TabsContent value="ai" className="flex-1 flex flex-col mt-0">
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
