'use client';

import { useTransition } from 'react';
import { RefreshCcw } from 'lucide-react';
import updateContests from './updateJobs';

export default function RefreshButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const res = await updateJobs();
      alert(res.message);
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow flex items-center justify-center w-14 h-14"
    >
      <RefreshCcw className={`w-6 h-6 ${isPending ? 'animate-spin' : ''}`} />
    </button>
  );
}
