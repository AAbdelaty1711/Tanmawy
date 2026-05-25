"use client";

import React, { useState } from "react";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import PostCard from "@/src/components/dashboard/PostCard";
import { 
  Image as ImageIcon, Sparkles, MapPin, BarChart2, BadgeCheck, 
  Target
} from "lucide-react";
import { useUserStore } from "@/src/store/useUserStore";
import { useLayoutStore } from "@/src/store/useLayoutStore";

/* ── Cleaned up Feed Posts ───────────────────────── */
const FEED_POSTS = [
  {
    id: 2,
    author: "فيصل بن سلمان",
    entity: "جمعية روافد",
    role: "داعم فضي",
    time: "٥ س",
    category: "كيان جديد",
    categoryColor: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    content: "يسعدني الإعلان عن ترخيص كيان «روافد للتمكين والتدريب» رسمياً اليوم! الكيان سيقدم برامج تأهيل مهني للشباب والشابات على مدار العام القادم.",
    likes: 542, comments: 95, reposts: 124,
    avatarGradient: "from-blue-200 to-indigo-300",
  },
  {
    id: 4,
    author: "محمد الشهري",
    entity: "مؤسسة الغد الأهلية",
    role: "مؤسس",
    time: "يومان",
    content: "سؤال للمجتمع\n\nما أكثر تحدٍّ واجهتموه عند إنشاء الكيانات التنموية؟\n\nأعمل على تقرير شامل وأريد أن يعكس تجاربكم الحقيقية على الأرض.",
    likes: 758, comments: 231, reposts: 97,
    avatarGradient: "from-amber-200 to-orange-300",
  },
  {
    id: 5,
    author: "نورة الحربي",
    entity: "فريق آفاق التطوعي",
    role: "متطوعة نشطة",
    time: "٣ أيام",
    category: "قصة نجاح",
    categoryColor: "bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
    content: "بعد 6 أشهر من الانضمام لمجتمع تنموي، تمكنت من تحويل فكرة بسيطة إلى مشروع يخدم 300 أسرة في حيّي\n\nالشكر لكل من آمن بي في هذه الرحلة الجميلة",
    likes: 4200, comments: 318, reposts: 892,
    avatarGradient: "from-rose-200 to-pink-300",
  },
  {
    id: 6,
    author: "عبدالرحمن السديري",
    entity: "جمعية تيسير الخيرية",
    role: "داعم بلاتيني",
    time: "٤ أيام",
    category: "مبادرة جديدة",
    categoryColor: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    content: "الحمد لله، أطلقنا اليوم مبادرة «كسوة الشتاء» للأسر الأشد حاجة في المناطق الجبلية بجازان. شكر خاص لجميع المتطوعين والمتطوعات الذين ساهموا في الفرز والتوزيع",
    likes: 312, comments: 45, reposts: 67,
    avatarGradient: "from-teal-200 to-emerald-300",
  },
  {
    id: 7,
    author: "سارة الدوسري",
    entity: "جمعية بناء للإسكان",
    role: "عضو مجلس إدارة",
    time: "٥ أيام",
    content: "سعدنا اليوم باستضافة ورشة عمل «حوكمة الجمعيات الأهلية» بالتعاون مع المركز الوطني لتنمية القطاع غير الربحي. حضور رائع وتفاعل يثلج الصدر من قادة الكيانات!",
    likes: 892, comments: 114, reposts: 153,
    avatarGradient: "from-purple-200 to-indigo-300",
  },
  {
    id: 8,
    author: "ياسر القحطاني",
    entity: "وقف العطاء",
    role: "مدير مشاريع",
    time: "أسبوع",
    content: "تحديث سريع حول مشروع «سقيا الماء» بالخرج: انتهينا من تمديد 80% من شبكة التوصيل، وقريباً ستصل المياه العذبة لبيوت أهلنا. نسأل الله أن يكتب الأجر لكل من ساهم",
    likes: 1250, comments: 198, reposts: 342,
    avatarGradient: "from-cyan-200 to-blue-300",
  },
];

export default function Home() {
  const [postText, setPostText] = useState("");
  const { isFounder } = useUserStore();
  const { isLeftPanelOpen } = useLayoutStore();

  const COMPOSER_ACTIONS = [
    { icon: ImageIcon,  label: "صورة",    color: "text-primary  hover:bg-primary/10"  },
    { icon: BarChart2,  label: "استطلاع", color: "text-primary  hover:bg-primary/10"  },
    { icon: MapPin,     label: "موقع",    color: "text-primary  hover:bg-primary/10"  },
    ...(isFounder ? [{ icon: Target, label: "إرفاق مبادرة", color: "text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/20" }] : []),
    { icon: Sparkles,   label: "تنموي AI",color: "text-secondary hover:bg-secondary/10" },
  ];

  return (
    <DashboardLayout>
      <div className={`mx-auto w-full md:border-x md:border-border/40 min-h-screen transition-all duration-300 ease-in-out ${
        isLeftPanelOpen ? "max-w-[680px]" : "max-w-[860px]"
      }`}>
        {/* ── Composer ───────────────────────────── */}
        {isFounder && (
          <div className="border-b border-border px-4 pt-4 pb-3">
            <form onSubmit={(e) => { e.preventDefault(); setPostText(""); }}>
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center ring-1 ring-border">
                    <span className="text-[13px] font-bold text-foreground">ع</span>
                  </div>
                  {isFounder && (
                    <div className="absolute -bottom-1 -right-1 bg-surface rounded-full p-0.5 shadow-sm">
                      <BadgeCheck className="w-3.5 h-3.5 text-teal-500" strokeWidth={2.5} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Textarea */}
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    placeholder="شارك آخر أخبار كيانك، أو أطلق مبادرة جديدة..."
                    rows={2}
                    className="w-full resize-none text-[15px] text-foreground
                      placeholder:text-muted-fg bg-transparent border-none outline-none
                      leading-relaxed text-right pt-1.5 pb-0"
                  />

                  {/* Composer Footer Actions */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-0.5 -ml-2">
                      {COMPOSER_ACTIONS.map(({ icon: Icon, label, color }) => (
                        <button
                          key={label}
                          type="button"
                          aria-label={label}
                          className={`flex items-center justify-center w-9 h-9 rounded-full ${color} transition-colors`}
                        >
                          <Icon className="w-[18px] h-[18px]" strokeWidth={2} />
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {postText.length > 0 && (
                        <span className={`text-xs font-medium tabular-nums ${postText.length > 260 ? "text-rose-500" : "text-muted-fg"}`}>
                          {280 - postText.length}
                        </span>
                      )}
                      <button
                        type="submit"
                        disabled={!postText.trim() || postText.length > 280}
                        className="px-5 py-2 rounded-full text-[15px] font-bold text-white
                          bg-tanmawy-gradient transition-all duration-150
                          disabled:bg-none disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:shadow-none disabled:opacity-70 disabled:cursor-not-allowed
                          shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                      >
                        نشر
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ── Feed List ──────────────────────────── */}
        {FEED_POSTS.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </DashboardLayout>
  );
}
