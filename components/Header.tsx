export default function Header() {
  return (
    <header className="flex justify-between items-end px-5 sm:px-12 pt-10 pb-7 border-b border-[#222]">
      <h1 className="font-syne font-extrabold text-[40px] leading-[1.05] tracking-tight text-[#FAF9F6]">
        LISA<span className="text-[#D85A30]">.</span>
        <br />
        BALLARD
      </h1>
      <div className="text-right pl-6">
        <div className="flex items-center justify-end gap-1.5 text-[#1D9E75] text-sm font-medium mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
          Available for work
        </div>
        <p className="text-[15px] text-[#b8b6b1] leading-relaxed">
          Senior full-stack engineer
          <br />
          TypeScript · React · GraphQL · SQL
        </p>
      </div>
    </header>
  );
}
