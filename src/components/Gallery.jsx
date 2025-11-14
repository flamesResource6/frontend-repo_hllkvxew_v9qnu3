import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPhotos = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/photos`)
      const data = await res.json()
      setPhotos(data.items || [])
    } catch (e) {
      setError('Failed to load photos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  if (loading) {
    return <div className="text-center text-gray-600">Loading photos...</div>
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-2">{error}</p>
        <button onClick={fetchPhotos} className="px-4 py-2 bg-blue-600 text-white rounded">Retry</button>
      </div>
    )
  }

  if (!photos.length) {
    return <div className="text-center text-gray-600">No photos yet. Be the first to post!</div>
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((p) => (
        <article key={p.id} className="group overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={p.image_url}
              alt={p.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000&auto=format&fit=crop'; }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 truncate">{p.title}</h3>
            {p.caption && <p className="mt-1 text-sm text-gray-600 line-clamp-2">{p.caption}</p>}
            <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
              <span>{p.author || 'Anonymous'}</span>
              <span>❤️ {p.likes || 0}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
