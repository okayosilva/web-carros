export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex h-11 items-center justify-center gap-6 rounded-lg px-6 py-10 text-center font-medium text-zinc-700">
      <p className="text-sm">
        @ 1995 - {currentYear} WebCarros. Todos os direitos reservados.
      </p>
    </div>
  );
}
