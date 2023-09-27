import React from 'react';

import Icons from '@/components/common/Icons';

export default function StepCounter() {
  const items = [
    {
      label: 'Select type',
      key: 'type',
      isChecked: false,
    },
    {
      label: 'Campaign',
      key: 'campaign',
      isChecked: false,
    },
    {
      label: 'Select influencers',
      key: 'select',
      isChecked: false,
    },
    {
      label: 'Agreement',
      key: 'agreement',
      isChecked: false,
    },
  ];
  return (
    <div className="grid h-fit items-center gap-8 rounded-3xl bg-slate-200 px-3.5 py-6 dark:bg-gray-900">
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-3 px-2">
          <Icons.Check />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
