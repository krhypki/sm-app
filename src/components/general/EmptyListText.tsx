type EmptyListTextProps = {
  children: React.ReactNode;
};

export default function EmptyListText({ children }: EmptyListTextProps) {
  return <p className="text-center text-xl font-semibold mt-10">{children}</p>;
}
