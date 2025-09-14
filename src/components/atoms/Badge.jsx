export default function Badge({ kind, variant = "landscape" }) {
  const isPortrait = variant === "portrait";

  if (kind === "top10") {
    // 🎯 Ribbon merah kanan-atas "Top 10"
    return (
      <div
        className="absolute right-4 top-0 bg-[#B71F1D] text-white font-semibold
                   w-[24px] h-[36px] text-[10px] leading-[12px] rounded-bl-[6px] rounded-tr-[6px]
                   flex items-center justify-center text-center
                   md:right-4 md:w-[32px] md:h-[48px] md:text-xs md:leading-tight md:rounded-bl-md md:rounded-tr-md"
        aria-label="Top 10"
      >
        <div>
          Top
          <br />
          10
        </div>
      </div>
    );
  }

  if (kind === "episode") {
    // 🎯 Pill biru kiri-atas "Episode Baru"
    return (
      <div
        className={`absolute ${
          isPortrait
            ? "top-2 left-2 md:top-4 md:left-4"
            : "top-2 left-2"
        } bg-[#0F1E93] text-white ${
          isPortrait ? "text-[8px] md:text-xs" : "text-xs"
        } font-semibold px-2 py-1 rounded-full shadow`}
        aria-label="Episode Baru"
      >
        Episode Baru
      </div>
    );
  }

  return null;
}
