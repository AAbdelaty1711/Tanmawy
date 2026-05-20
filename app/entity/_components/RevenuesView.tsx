import React from "react";

export function RevenuesView() {
  const donations = [
    { name: "عبدالله محمد", amount: "500 ر.س", date: "2026-05-19", status: "مكتمل" },
    { name: "فاعل خير", amount: "1,200 ر.س", date: "2026-05-18", status: "مكتمل" },
    { name: "سارة أحمد", amount: "300 ر.س", date: "2026-05-17", status: "قيد المعالجة" },
  ];
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-[15px] font-black text-slate-900">أحدث التبرعات</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right text-[13px]">
          <thead className="bg-slate-50 text-slate-500 font-bold">
            <tr>
              <th className="px-5 py-3">المتبرع</th>
              <th className="px-5 py-3">المبلغ</th>
              <th className="px-5 py-3">التاريخ</th>
              <th className="px-5 py-3">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donations.map((d, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4 font-semibold text-slate-800">{d.name}</td>
                <td className="px-5 py-4 font-bold text-primary">{d.amount}</td>
                <td className="px-5 py-4 text-slate-500">{d.date}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    d.status === 'مكتمل' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
