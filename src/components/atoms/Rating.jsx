// atoms/Rating.jsx
export default function Rating({ value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-[4px]">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px] text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <span className="text-[14px] font-normal font-['Lato']">{value}</span>
    </div>
  );
}
