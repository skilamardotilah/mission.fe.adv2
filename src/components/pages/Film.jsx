// src/pages/Film.jsx
import { useEffect, useState } from 'react';
import Navbar from '@/components/organisms/Navbar.jsx';
import CarouselRow from '@/components/organisms/CarouselRow.jsx';
import Footer from '@/components/organisms/Footer.jsx';
import HeroSection from '@/components/organisms/HeroSection.jsx';
import FilmDetailPopup from '@/components/organisms/FilmDetailPopup.jsx';
import FilmPlayer from '@/components/molecules/FilmPlayer.jsx';
import { useWatchlist } from '@/contexts/WatchlistContext.jsx';
import { useFilms } from '@/hooks/useFilms';

const asset = (p) => new URL(`../../assets/${p}`, import.meta.url).href; // dipakai hanya jika ingin pakai asset lokal

export default function Film() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const { addToWatchlist } = useWatchlist();
  
  // Redux state using custom hook
  const { films, loading, error, getFilms } = useFilms();

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  const toItem = (f) => ({
    src: f.image,
    title: f.title,
    rating: f.rating,
    badge: f.badge || '',
    description: f.description || 'No description available.',
    ...f,
  });

  const by = (cat) =>
    films
      .filter(
        (f) =>
          f.category === cat ||
          (cat === 'continue' && f.category === 'continueWatching') ||
          (cat === 'chill' && f.category === 'chillFilms') ||
          (cat === 'top' && (f.category === 'topRating' || f.category === 'top')) ||
          (cat === 'trending' && f.category === 'trending') ||
          (cat === 'new' && (f.category === 'newRelease' || f.category === 'new'))
      )
      .map(toItem);

  const continueWatching = by('continue');
  const chillFilms = by('chill');
  const topRating = by('top');
  const trending = by('trending');
  const newRelease = by('new');

  const handlePosterClick = (item) => setSelectedItem(item);
  const handleClosePopup = () => setSelectedItem(null);
  const handleAddToWatchlist = (item) => {
    addToWatchlist(item);
    handleClosePopup();
  };

  const handleStartWatching = () => {
    setShowPlayer(true);
  };

  // CRUD Operations using Redux
  const handleAddDemo = async () => {
    const filmData = {
      title: 'Demo Film',
      rating: '4.2/5',
      image: 'https://picsum.photos/300/450?demo',
      description: 'Created from UI',
      badge: 'New',
      category: 'new',
    };
    dispatch(addNewFilm(filmData));
  };

  const handleUpdateFirst = async () => {
    if (!films[0]) return;
    const updatedData = { ...films[0], rating: '5/5' };
    dispatch(updateExistingFilm({ id: films[0].id, filmData: updatedData }));
  };

  const handleDeleteFirst = async () => {
    if (!films[0]) return;
    dispatch(deleteExistingFilm(films[0].id));
  };

  if (loading) return <div className="bg-[#181A1C] text-white p-8">Loading…</div>;
  if (error) return <div className="bg-[#181A1C] text-white p-8">Error: {error}</div>;
  if (!films.length) return <div className="bg-[#181A1C] text-white p-8">No film data found.</div>;

  return (
    <div className="bg-[#181A1C] text-white font-lato min-h-screen">
      <Navbar />

      <HeroSection
        bg={asset('img/film/hero-film.png')}
        title="Guardians of the Galaxy Vol. 3"
        description={`Masih goyah karena kehilangan Gamora, Peter Quill mengumpulkan timnya untuk mempertahankan alam semesta dan salah satu dari mereka - sebuah misi yang bisa berarti akhir dari Penjaga jika tidak berhasil.`}
        onStart={handleStartWatching}
      />

      {/* ...existing code... */}

      <CarouselRow title="Melanjutkan Tonton Film" items={continueWatching} variant="landscape" onPosterClick={handlePosterClick} />
      <CarouselRow title="Film Persembahan Chill" items={chillFilms} variant="portrait" onPosterClick={handlePosterClick} />
      <CarouselRow title="Top Rating Film Hari ini" items={topRating} variant="portrait" onPosterClick={handlePosterClick} />
      <CarouselRow title="Film Trending" items={trending} variant="portrait" onPosterClick={handlePosterClick} />
      <CarouselRow title="Rilis Baru" items={newRelease} variant="portrait" onPosterClick={handlePosterClick} />

      {selectedItem && <FilmDetailPopup item={selectedItem} onClose={handleClosePopup} onAddToWatchlist={handleAddToWatchlist} type="film" />}

      {/* PLAYER */}
      {showPlayer && (
        <div className="fixed inset-0 z-[9999]">
          <FilmPlayer onClose={() => setShowPlayer(false)} itemId="guardians-vol-3" type="film" />
        </div>
      )}

      <Footer />
    </div>
  );
}
