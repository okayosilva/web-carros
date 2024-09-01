type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex min-h-screen flex-col items-center py-8">
      <section className="w-full max-w-7xl px-4">{children}</section>
    </div>
  );
}
