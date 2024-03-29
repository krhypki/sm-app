const delays = ['', 'delay-300', 'delay-700'];

export default function Loading() {
  return (
    <div className=" w-screen flex justify-center gap-x-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {delays.map((delay) => (
        <span
          key={delay}
          className={`block w-[50px] h-[50px] rounded-full bg-slate-800 animate-pulse ${delay}`}
        ></span>
      ))}
    </div>
  );
}
