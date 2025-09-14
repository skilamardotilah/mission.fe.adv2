import Button from '@/components/atoms/Button.jsx';

function HeroSection({ bg, title, description, onStart, onMore }) {
  return (
    <section
      className="
        relative w-full 
        aspect-[16/9] md:aspect-auto md:h-[600px]
        overflow-hidden  
      "
    >
      <img src={bg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain md:object-cover object-center" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[500px] bg-gradient-to-b from-transparent to-[#181A1C]" />

      <section className="w-full px-4 md:px-[80px] py-[10px] flex flex-col gap-[32px]">
        <div className="py-[10px]">
          <div
            className="
              relative 
              pt-[40px] pb-[10px]    
              md:pt-[235px] md:pb-[40px]
              text-white flex flex-col justify-center h-full space-y-4
            "
          >
            {/* Title & Description */}
            <h1 className="text-2xl md:text-4xl leading-[1.1] font-bold">{title}</h1>
            <p className="max-w-2xl text-sm md:text-base font-medium text-gray-200 tracking-[0.2px] leading-[1.4] line-clamp-2 md:line-clamp-none md:whitespace-pre-line">{description}</p>

            {/* Buttons */}
            <div className="flex justify-between items-center pt-2 md:pt-4">
              <div className="flex items-center space-x-2 md:space-x-4">
                <Button variant="primary" size="responsive" onClick={onStart}>
                  Mulai
                </Button>
                <Button variant="gray" size="responsive" icon onClick={onMore} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="md:w-5 md:h-5 text-white" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
                  </svg>
                  Selengkapnya
                </Button>
                <Button variant="outline" size="responsive">18+</Button>
              </div>

              <Button variant="outline" size="responsive">
                <i className="material-icons text-[#C1C2C4] text-xs md:text-2xl">volume_off</i>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default HeroSection;
