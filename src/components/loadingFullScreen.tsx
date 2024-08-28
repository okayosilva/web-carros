import { LoaderCircle } from 'lucide-react';

export function LoadingFullScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
      <LoaderCircle size={40} className="animate-spin text-red-600" />
    </div>
  );
}
