import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function UploadForm({ onSuccess }) {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [author, setAuthor] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/api/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, image_url: imageUrl, caption, author })
      })
      if (!res.ok) throw new Error('Failed to post photo')
      setTitle(''); setImageUrl(''); setCaption(''); setAuthor('')
      onSuccess && onSuccess()
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} required className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Sunset over the hills" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} required type="url" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Caption</label>
        <textarea value={caption} onChange={(e)=>setCaption(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Say something about this photo" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input value={author} onChange={(e)=>setAuthor(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name (optional)" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={submitting} className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
        {submitting ? 'Posting...' : 'Post Photo'}
      </button>
    </form>
  )
}
