"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { useUserStore } from "@/src/store/useUserStore";
import { Sparkles, Send } from "lucide-react";

/* ── Types ───────────────────────────────────────────── */
type Role = "user" | "ai";
interface Message {
  id: number;
  role: Role;
  content: string;
}

/* ── Mock AI Responses ───────────────────────────────── */
const AI_RESPONSES: Record<string, string> = {
  default:
    "شكراً على سؤالك! أنا تنموي AI وأعمل على تحليل طلبك لتقديم أفضل إجابة ممكنة. يمكنني مساعدتك في إدارة المبادرات، تحليل البيانات، وصياغة التقارير.",
  "صياغة خطة استراتيجية لحملة رمضان":
    "بالطبع! إليك خطة استراتيجية مقترحة لحملة رمضان:\n\n**الأهداف:**\n• جمع 200,000 ر.س خلال شهر رمضان\n• الوصول لـ 500 أسرة محتاجة\n\n**المراحل:**\n1. الإطلاق (الأسبوع الأول): إعلان الحملة عبر منصات التواصل\n2. التفاعل (الأسابيع 2-3): قصص المستفيدين + تحديثات يومية\n3. الختام (الأسبوع الأخير): حث على إتمام الهدف\n\n**القنوات المقترحة:** تويتر، واتساب، الموقع الرسمي",
  "تحليل أسباب تراجع تبرعات الشهر الماضي":
    "بناءً على الأنماط الشائعة في الكيانات المماثلة، إليك أبرز الأسباب المحتملة:\n\n📉 **أسباب التراجع:**\n• انخفاض التفاعل على المنشورات (أقل من 3%)\n• غياب قصص تأثير حديثة للمستفيدين\n• تراجع الثقة بسبب عدم نشر تقارير مالية دورية\n\n✅ **التوصيات:**\n1. نشر قصة مستفيد واحدة أسبوعياً\n2. إرسال تقرير شفافية شهري للمتبرعين\n3. إطلاق حملة 'شكراً لداعمينا' لتعزيز الولاء",
  "كتابة تقرير أثر لداعمي مشروع سقيا الماء":
    "**تقرير أثر: مشروع سقيا الماء**\n*الفترة: يناير – مارس 2026*\n\nبفضل دعمكم الكريم، تمكّنّا من:\n\n💧 حفر **5 آبار ارتوازية** في مناطق نائية\n👨‍👩‍👧‍👦 إيصال المياه النظيفة لـ **1,200 مستفيد مباشر**\n🏘️ خدمة **8 قرى** في المنطقة\n💰 إجمالي التبرعات المُنفَّقة: **85,000 ر.س** (كفاءة 94%)\n\nنشكر كل داعم ساهم في تحقيق هذا الأثر الإنساني العظيم.",
  "رشح لي أفضل مبادرات رعاية الأيتام":
    "بالتأكيد! إليك أبرز المبادرات المعتمدة في تنموي لرعاية الأيتام:\n\n🌟 **المبادرات الموصى بها:**\n\n1. **كفالة طالب علم** - جمعية البر الخيرية\n   • 500 ر.س / شهر | 85% مكتملة\n\n2. **الكسوة الموسمية** - مؤسسة الرحمة\n   • 200 ر.س / مرة واحدة | 60% مكتملة\n\n3. **الرعاية الشاملة** - جمعية نقاء\n   • 1,000 ر.س / شهر | 45% مكتملة\n\nاضغط على أي منها لمعرفة التفاصيل والتبرع عبر القنوات الرسمية.",
  "كيف يمكنني تقييم أثر تبرعاتي؟":
    "سؤال رائع! تقييم أثر التبرعات يساعدك على اتخاذ قرارات أذكى:\n\n**معايير التقييم:**\n\n📊 **الكفاءة المالية:** هل تُنفَق 90%+ من التبرعات على المستفيدين؟\n\n📋 **الشفافية:** هل تُصدر الجمعية تقارير مالية سنوية؟\n\n👥 **عدد المستفيدين:** كم أسرة/فرد استفادوا مقابل كل 1,000 ر.س؟\n\n⭐ **التقييمات:** ما درجة رضا المستفيدين؟\n\nيمكنني مساعدتك في بناء نموذج تقييم مخصص للمبادرات التي تدعمها.",
  "اقتراح أفكار تطوعية تناسب عطلة نهاية الأسبوع":
    "رائع أنك تريد التطوع! إليك أفكار عملية لعطلة نهاية الأسبوع:\n\n🕒 **نشاطات 2-4 ساعات:**\n• توزيع وجبات الإفطار في ملاجئ الأسر\n• تعليم القرآن لأطفال دور الرعاية\n• تنظيف الحدائق العامة مع مجموعة\n\n📅 **نشاطات ليوم كامل:**\n• الزيارات الميدانية مع فرق الكيانات\n• ورشة مهارات مهنية للشباب\n• حملة تشجير في الأحياء\n\n💡 **نصيحة:** ابدأ بالتسجيل في منصة تنموي كمتطوع لتصلك إشعارات الفرص القريبة منك!",
};

function getMockResponse(input: string): string {
  const key = Object.keys(AI_RESPONSES).find((k) =>
    k !== "default" && input.includes(k.replace(/[📄📊✍️🔍💡🌱]/gu, "").trim())
  );
  return key ? AI_RESPONSES[key] : AI_RESPONSES.default;
}

/* ── Suggestion Card ─────────────────────────────────── */
function SuggestionCard({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="text-right w-full p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-200 group"
    >
      <span className="text-[14px] text-slate-700 dark:text-slate-200 font-semibold leading-snug group-hover:text-primary transition-colors">
        {text}
      </span>
    </motion.button>
  );
}

/* ── Message Bubble ──────────────────────────────────── */
function MessageBubble({ msg }: { msg: Message }) {
  const isAI = msg.role === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isAI ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Avatar */}
      {isAI ? (
        <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-sm ring-1 ring-border mt-0.5">
          <Sparkles className="w-4 h-4 text-secondary" strokeWidth={2} />
        </div>
      ) : (
        <div className="shrink-0 w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center mt-0.5">
          <span className="text-[13px] font-black text-primary">ع</span>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line ${
          isAI
            ? "bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-100 rounded-tr-sm shadow-sm"
            : "bg-primary/10 text-primary rounded-tl-sm"
        }`}
      >
        {msg.content}
      </div>
    </motion.div>
  );
}

/* ── Loading Dots ────────────────────────────────────── */
function LoadingDots() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-sm ring-1 ring-border">
        <Sparkles className="w-4 h-4 text-secondary" strokeWidth={2} />
      </div>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl rounded-tr-sm px-4 py-3.5 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function AIPage() {
  const { isFounder } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  let nextId = useRef(0);

  const founderSuggestions = [
    "📄 صياغة خطة استراتيجية لحملة رمضان",
    "📊 تحليل أسباب تراجع تبرعات الشهر الماضي",
    "✍️ كتابة تقرير أثر لداعمي مشروع سقيا الماء",
  ];
  const userSuggestions = [
    "🔍 رشح لي أفضل مبادرات رعاية الأيتام",
    "💡 كيف يمكنني تقييم أثر تبرعاتي؟",
    "🌱 اقتراح أفكار تطوعية تناسب عطلة نهاية الأسبوع",
  ];
  const suggestions = isFounder ? founderSuggestions : userSuggestions;

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  /* Auto-resize textarea */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [inputValue]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: nextId.current++,
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: nextId.current++,
        role: "ai",
        content: getMockResponse(trimmed),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-50px)]">

        {/* ── Chat area ── */}
        <div className="flex-1 overflow-y-auto px-4 py-6">

          {/* Empty / Welcome state */}
          <AnimatePresence>
            {messages.length === 0 && !loading && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center min-h-[55vh] text-center"
              >
                {/* Animated icon */}
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 shadow-lg ring-2 ring-white dark:ring-slate-800"
                >
                  <Sparkles className="w-8 h-8 text-secondary" strokeWidth={2} />
                </motion.div>

                <h1 className="text-[22px] font-black text-slate-900 dark:text-slate-100 mb-2">
                  مرحباً بك في تنموي AI
                </h1>
                <p className="text-[14px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-8">
                  مساعدك الذكي لتعظيم الأثر المجتمعي وإدارة المبادرات بفعالية
                </p>

                {/* Role badge */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold mb-6 ${
                  isFounder
                    ? "bg-primary/8 text-primary border border-primary/15"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5"
                }`}>
                  <Sparkles className="w-3 h-3" />
                  {isFounder ? "وضع إدارة الكيانات" : "وضع الداعم والمتطوع"}
                </div>

                {/* Suggestion cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                  {suggestions.map((s) => (
                    <SuggestionCard
                      key={s}
                      text={s}
                      onClick={() => sendMessage(s)}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="max-w-2xl mx-auto space-y-5">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            {loading && <LoadingDots />}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* ── Input area ── */}
        <div className="px-4 pb-5 pt-2 bg-background">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-sm flex items-end gap-2">
              {/* Send button (left in RTL = left side, but we use flex-row so it appears left) */}
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || loading}
                className="shrink-0 w-10 h-10 rounded-xl bg-tanmawy-gradient flex items-center justify-center shadow-sm transition-all hover:shadow-md hover:scale-[1.04] active:scale-[0.96] disabled:opacity-40 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed"
                aria-label="إرسال"
              >
                <Send className="w-4 h-4 text-white rotate-180" strokeWidth={2} />
              </button>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isFounder
                    ? "اسألني عن تحليل البيانات، صياغة التقارير، أو التخطيط الاستراتيجي..."
                    : "اسألني عن أفضل المبادرات، أفكار التطوع، أو كيفية تقييم أثر تبرعاتك..."
                }
                rows={1}
                className="flex-1 resize-none bg-transparent text-[14px] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none leading-relaxed py-2 px-2 max-h-[120px] text-right"
                style={{ overflow: "hidden" }}
              />
            </div>
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              تنموي AI قد يُخطئ. تحقق من المعلومات المهمة دائماً.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
