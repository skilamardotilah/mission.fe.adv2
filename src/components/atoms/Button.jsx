export default function Button({ variant = 'primary', size = 'md', rounded = 'full', className = '', href, children, icon = false, ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold transition';
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
    responsive: 'px-3 py-1 text-sm md:px-4 md:py-2 md:text-base',
  };
  const rounds = {
    full: 'rounded-full',
    xl: 'rounded-xl',
    none: 'rounded',
  };
  const variants = {
    primary: 'bg-blue-800 text-white hover:opacity-70',
    sso: 'border border-[#E7E3FC3B] text-white bg-transparent hover:bg-white/10',
    outline: 'border border-[#C1C2C4] text-[#C1C2C4] bg-transparent hover:bg-white/10',
    gray: 'bg-[#3D4142] text-white font-base hover:opacity-90',
  };

  const iconAdjust = icon ? 'gap-1 md:gap-2' : '';

  const cls = [base, sizes[size], rounds[rounded], variants[variant], iconAdjust, className].join(' ').trim();

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
