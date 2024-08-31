import { Upload } from 'lucide-react';

export function Dashboard() {
  return (
    <section className="mt-9 flex flex-col">
      <div className="rounded-lg bg-white px-4 py-2 shadow-sm">
        <button className="relative flex h-40 w-full items-center justify-center rounded-lg border-2 border-zinc-700 md:max-w-56">
          <Upload size={32} className="text-zinc-700" />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </button>
      </div>

      <div className="mt-2 flex w-full flex-col items-center rounded-lg bg-white p-3 sm:flex-row">
        Teste
      </div>
    </section>
  );
}
