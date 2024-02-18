import React from "react";

function SmallCard({ title, label }: { title: string; label?: any }) {
  return (
    <div className="px-5 py-4 bg-slate-200 dark:bg-gray-900 rounded-2xl h-fit">
      <div className="text-sm font-medium text-gray-700">{title}</div>
      <div className="text-xl font-semibold text-primary-600">{label}</div>
    </div>
  );
}

export default SmallCard;
