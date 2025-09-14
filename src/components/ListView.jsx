import React, { useEffect, useState } from 'react';
import { useFilms } from '../hooks/useFilms';
import { useReduxWatchlist } from '../hooks/useReduxWatchlist';

const ListView = () => {
  const { films, loading, error, getFilms, addFilm, updateFilm, deleteFilm } = useFilms();
  const { 
    watchlist, 
    watchProgress, 
    addToWatchlist, 
    removeFromWatchlist, 
    updateNoteStatus,
    startWatching,
    updateProgress,
    removeProgress,
    getProgress,
    hasProgress,
    loadFromLocalStorage,
    saveToLocalStorage
  } = useReduxWatchlist();

  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ note: '', status: 'Plan to Watch', progress: 0 });

  // Fetch data on mount
  useEffect(() => {
    getFilms();
    loadFromLocalStorage();
  }, [getFilms, loadFromLocalStorage]);

  // Save to localStorage whenever watchlist or progress changes
  useEffect(() => {
    saveToLocalStorage();
  }, [watchlist, watchProgress, saveToLocalStorage]);

  // Film CRUD operations
  const handleAddFilm = async (newItem) => {
    try {
      await addFilm(newItem);
    } catch (error) {
      console.error('Error adding film:', error);
    }
  };

  const handleEditFilm = async (item) => {
    try {
      await updateFilm(item.id, item);
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  const handleDeleteFilm = async (id) => {
    try {
      await deleteFilm(id);
    } catch (error) {
      console.error('Error deleting film:', error);
    }
  };

  // Watchlist operations
  const handleAddToWatchlist = (item) => {
    const watchlistItem = {
      src: item.image || item.id,
      title: item.title,
      rating: item.rating,
      description: item.description,
      type: 'film'
    };
    addToWatchlist(watchlistItem);
    startWatching(watchlistItem.src, 'film');
  };

  const handleRemoveFromWatchlist = (item) => {
    removeFromWatchlist(item);
    removeProgress(item.src || item.id);
  };

  const handleStartEditing = (item) => {
    setEditingItem(item);
    const progress = getProgress(item.src || item.id);
    setEditForm({
      note: item.note || '',
      status: item.status || 'Plan to Watch',
      progress: progress ? progress.progress : 0
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateNoteStatus(editingItem.src, editForm.note, editForm.status);
      updateProgress(editingItem.src || editingItem.id, editForm.progress);
      setEditingItem(null);
      setEditForm({ note: '', status: 'Plan to Watch', progress: 0 });
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditForm({ note: '', status: 'Plan to Watch', progress: 0 });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Comprehensive CRUD Demo</h2>
      
      {/* Films Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Films from API ({films.length})</h3>
        <div className="grid gap-4">
          {films && films.length > 0 ? (
            films.map((item) => (
              <div key={item.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.description || 'No description'}</p>
                    <p className="text-sm text-gray-500">Rating: {item.rating || 'N/A'}</p>
                    <p className="text-sm text-gray-500">Category: {item.category || 'N/A'}</p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleAddToWatchlist(item)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      Add to Watchlist
                    </button>
                    <button 
                      onClick={() => handleEditFilm({ ...item, title: item.title + ' (edited)' })}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Edit Film
                    </button>
                    <button 
                      onClick={() => handleDeleteFilm(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete Film
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No films available</p>
          )}
        </div>
        <button 
          onClick={() => handleAddFilm({ 
            id: Date.now(), 
            title: 'New Film', 
            description: 'A new film added via Redux',
            rating: 5,
            category: 'new',
            image: 'https://via.placeholder.com/300x400'
          })}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Film to API
        </button>
      </div>

      {/* Watchlist Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">My Watchlist ({watchlist.length})</h3>
        <div className="grid gap-4">
          {watchlist && watchlist.length > 0 ? (
            watchlist.map((item, index) => (
              <div key={item.src || index} className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">Status: {item.status || 'Plan to Watch'}</p>
                    <p className="text-sm text-gray-600 mb-2">Note: {item.note || 'No note'}</p>
                    <p className="text-sm text-gray-500">
                      Progress: {getProgress(item.src) ? `${getProgress(item.src).progress}%` : '0%'}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => handleStartEditing(item)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleRemoveFromWatchlist(item)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                {/* Edit Form */}
                {editingItem && editingItem.src === item.src && (
                  <form onSubmit={handleSaveEdit} className="mt-4 p-4 bg-white rounded border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Status:</label>
                        <select 
                          value={editForm.status} 
                          onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                          className="w-full p-2 border rounded"
                        >
                          <option value="Plan to Watch">Plan to Watch</option>
                          <option value="Watching">Watching</option>
                          <option value="Finished">Finished</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Progress (%):</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="100" 
                          value={editForm.progress} 
                          onChange={(e) => setEditForm({...editForm, progress: parseInt(e.target.value)})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Note:</label>
                        <input 
                          type="text" 
                          value={editForm.note} 
                          onChange={(e) => setEditForm({...editForm, note: e.target.value})}
                          className="w-full p-2 border rounded"
                          placeholder="Add a note..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button 
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in watchlist</p>
          )}
        </div>
      </div>

      {/* Watch Progress Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Watch Progress Summary</h3>
        <div className="grid gap-2">
          {Object.keys(watchProgress).length > 0 ? (
            Object.entries(watchProgress).map(([itemId, progress]) => (
              <div key={itemId} className="bg-gray-100 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Item ID: {itemId}</span>
                  <span className="text-sm text-gray-600">
                    {progress.progress}% - {progress.type}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${progress.progress}%` }}
                  ></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No watch progress data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListView;
