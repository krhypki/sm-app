const delays = ['', 'delay-150', 'delay-300'];

export default function Loading() {
  return (
    <div className=" w-screen flex justify-center gap-x-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {delays.map((delay) => (
        <span
          key={delay}
          className={`block w-[40px] h-[40px] rounded-full bg-slate-800 animate-pulse ${delay}`}
        ></span>
      ))}
    </div>
  );
}
