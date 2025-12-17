
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { SCENARIOS, formatCurrency } from '../constants';
import Logo from './Logo';

const ChatAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { 
      role: 'model', 
      text: 'Olá! Sou o **Estrategista de IA da ADS GROW**. Analisei suas projeções para 2026.\n\nComo posso ajudar você a otimizar seu **ROI** e escalar suas operações hoje?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const contextPrompt = `
        Você é um Especialista Sênior em Marketing e Vendas da ADS GROW.
        Sua missão é analisar dados de projeção e dar consultoria estratégica de alto nível.
        
        DADOS ATUAIS DO DASHBOARD 2026:
        ${SCENARIOS.map(s => `
        ### Cenário: ${s.name}
        - Faturamento: ${formatCurrency(s.total)}
        - Conversão: ${s.conversion}
        - Leads/mês: ${s.leads}
        - Ticket Médio: ${s.ticket}
        `).join('\n')}

        ESTILO DE RESPOSTA:
        1. **Formatação OBRIGATÓRIA**: Use Markdown (negrito, listas, títulos curtos).
        2. **Visão Analítica**: Não dê respostas genéricas. Use os números acima para comparar cenários.
        3. **Foco em Ação**: Termine sempre com uma recomendação prática (ex: "Aumentar o investimento em Google Ads no cenário Super Meta").
        4. **Terminologia**: Use termos como CAC, LTV, ROAS, Churn, Upsell e MQL/SQL.
        
        Responda em Português do Brasil de forma executiva, porém direta.
      `;

      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: contextPrompt,
        },
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text || "Tive um problema ao processar os dados. Por favor, tente novamente.";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Erro na IA:", error);
      setMessages(prev => [...prev, { role: 'model', text: "**Erro Crítico:** Não consegui conectar à base de inteligência ADS GROW. Verifique sua conexão." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group ${
          isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-brand-blue text-black shadow-brand-blue/40'
        }`}
      >
        {isOpen ? <X size={28} /> : (
          <div className="relative">
             <Bot size={28} className="group-hover:animate-bounce" />
          </div>
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-white border-2 border-brand-blue flex items-center justify-center">
              <span className="text-[8px] font-black text-brand-blue leading-none">AI</span>
            </span>
          </span>
        )}
      </button>

      {/* Janela de Chat */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[400px] md:w-[480px] h-[650px] bg-surface/98 backdrop-blur-3xl border border-slate-800 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-500">
          {/* Header do Chat */}
          <div className="p-8 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20 shadow-inner overflow-hidden">
                <Logo size={28} showText={false} />
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">ADS GROW AI</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Consultor Estratégico</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue/10 border border-brand-blue/20">
              <Sparkles size={16} className="text-brand-blue" />
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-tighter">Gen v3</span>
            </div>
          </div>

          {/* Mensagens */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gradient-to-b from-transparent to-brand-blue/[0.02]"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-5 max-w-[92%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border transition-all duration-300 ${
                    msg.role === 'user' 
                    ? 'bg-brand-blue/20 border-brand-blue/40 shadow-glow' 
                    : 'bg-slate-800 border-slate-700 shadow-card'
                  }`}>
                    {msg.role === 'user' ? <User size={20} className="text-brand-blue" /> : <Bot size={20} className="text-brand-blue" />}
                  </div>
                  <div className={`p-6 rounded-3xl text-[13px] leading-relaxed prose-chat shadow-card border ${
                    msg.role === 'user' 
                      ? 'bg-brand-blue text-black rounded-tr-none border-white/20 font-medium' 
                      : 'bg-slate-900/80 text-slate-200 rounded-tl-none border-slate-800/80'
                  }`}>
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-5 max-w-[85%]">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-card">
                    <Loader2 size={20} className="text-brand-blue animate-spin" />
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-800/40 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-800/50 flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span>Cruzando Dados Financeiros...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-8 bg-slate-900/60 border-t border-slate-800/80">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ex: Qual o plano para bater o ROI no cenário Super Meta?"
                className="w-full bg-slate-950/90 border border-slate-800 text-white text-sm rounded-[2rem] py-5 pl-8 pr-16 focus:outline-none focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/5 transition-all placeholder:text-slate-700 shadow-inner"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-brand-blue text-black rounded-2xl hover:bg-white hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed shadow-glow"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex justify-center items-center gap-6 mt-6">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-800"></div>
              <p className="text-[9px] text-slate-600 uppercase font-black tracking-[0.4em]">
                ADS GROW INTELLIGENCE
              </p>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-800"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAgent;
