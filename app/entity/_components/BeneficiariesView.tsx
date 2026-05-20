import React from 'react'

export function BeneficiariesView() {
  const families = [
    { name: 'عائلة أحمد', type: 'دعم مالي شهري', status: 'نشط' },
    { name: 'عائلة اليتيم', type: 'كفالة أيتام', status: 'نشط' },
    { name: 'عائلة محمد', type: 'سلة غذائية', status: 'قيد المراجعة' },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {families.map((f, i) => (
        <div
          key={i}
          className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div>
            <h4 className="text-[15px] font-black text-slate-900 mb-1">
              {f.name}
            </h4>
            <p className="text-[12px] text-slate-500">{f.type}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold ${
              f.status === 'نشط'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-amber-50 text-amber-600'
            }`}
          >
            {f.status}
          </span>
        </div>
      ))}
    </div>
  )
}
