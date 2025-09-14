// molecules/PosterCard.jsx
import Badge from '../atoms/Badge.jsx';
import Rating from '../atoms/Rating.jsx';

export default function PosterCard({ src, title = '', rating, badge, variant = 'landscape', onClick }) {
  const isPortrait = variant === 'portrait';

  // ukuran sesuai desain
  const box = isPortrait ? 'w-[150px] h-[240px] md:w-[225px] md:h-[365px]' : 'min-w-[260px] md:min-w-[290px] h-[240px] md:h-[162px]';

  // mapping string badge -> kind
  const raw = (badge || '').toString().toLowerCase();
  const kind = raw.includes('top') ? 'top10' : raw.includes('episode') ? 'episode' : null;

  return (
    <div
      className={`relative ${box} rounded-lg overflow-hidden shrink-0 cursor-pointer
                  md:transform md:transition-transform md:duration-300 md:ease-in-out
                  ${isPortrait ? 'md:hover:scale-105' : ''}`}
      onClick={onClick}
    >
      {/* Badge */}
      {kind && <Badge kind={kind} variant={variant} />}

      <img src={src} alt={title || 'poster'} className="w-full h-full object-cover" />

      {/* footer gradien + judul + rating */}
      <div
        className="absolute bottom-0 left-0 w-full h-[54px] px-4 md:px-[16px]
                      flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent text-white"
      >
        <h6 className={`${isPortrait ? 'text-[14px] md:text-[18px]' : 'text-[18px]'} font-['Lato'] line-clamp-1`}>{title}</h6>
        <Rating value={rating} />
      </div>
    </div>
  );
}
