type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  return <div className="flex h-screen flex-col px-4 py-8">{children}</div>;
}
