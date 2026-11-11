import React from 'react';

export default function Odontogram({ toothData, onToothClick }) {
  // Universal Numbering System: Upper (1-16), Lower (17-32)
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1);
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => 32 - i);

  const getStatusColor = (status) => {
    switch (status) {
      case 'cavity':
        return 'bg-rose-500 text-white border-rose-600';
      case 'filled':
        return 'bg-sky-500 text-white border-sky-600';
      case 'missing':
        return 'bg-slate-300 text-slate-500 border-slate-400 line-through opacity-60';
      case 'crown':
        return 'bg-amber-400 text-amber-950 border-amber-500';
      case 'rootcanal':
        return 'bg-purple-600 text-white border-purple-700';
      default:
        return 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100';
    }
  };

  const renderTooth = (num) => {
    const status = toothData[num] || 'healthy';
    return (
      <button
        key={num}
        onClick={() => onToothClick(num)}
        title={`Tooth #${num}: ${status.toUpperCase()}`}
        className={`w-9 h-12 sm:w-10 sm:h-14 rounded-lg border-2 text-xs font-bold flex flex-col items-center justify-between p-1 transition-all shadow-sm ${getStatusColor(
          status
        )}`}
      >
        <span className="text-[10px] opacity-75">{num}</span>
        <div className="w-3 h-3 rounded-full border border-current opacity-60" />
      </button>
    );
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold">Interactive Odontogram (32-Tooth Chart)</h3>
          <p className="text-xs text-slate-400">Click any tooth to cycle conditions or assign treatments.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/40">Healthy</span>
          <span className="px-2 py-1 bg-rose-500/20 text-rose-300 rounded border border-rose-500/40">Cavity</span>
          <span className="px-2 py-1 bg-sky-500/20 text-sky-300 rounded border border-sky-500/40">Filled</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">Crown</span>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/40">Root Canal</span>
          <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded border border-slate-600">Missing</span>
        </div>
      </div>

      {/* Upper Arch */}
      <div className="space-y-2">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Upper Arch (Maxillary 1 - 16)</span>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {upperTeeth.map((num) => renderTooth(num))}
        </div>
      </div>

      {/* Lower Arch */}
      <div className="space-y-2 pt-4 border-t border-slate-800">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Lower Arch (Mandibular 17 - 32)</span>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {lowerTeeth.map((num) => renderTooth(num))}
        </div>
      </div>
    </div>
  );
}