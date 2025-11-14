import { useState } from 'react'
import Gallery from './components/Gallery'
import UploadForm from './components/UploadForm'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-sky-500 text-white font-bold">P</span>
            <span className="text-lg font-semibold text-gray-900">PicShare</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="#gallery">Explore</a>
            <a className="hover:text-gray-900" href="/test">System</a>
            <a className="hover:text-gray-900" href="#post">Post</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16">
        <section className="py-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">Share stunning photos with the world</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Post your favorite shots, write a caption, and inspire others. A minimal, modern space for photography lovers.</p>
          <div id="post" className="mt-8 max-w-xl mx-auto bg-white/80 backdrop-blur rounded-2xl shadow p-6">
            <UploadForm onSuccess={refresh} />
          </div>
        </section>

        <section id="gallery" className="py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Latest posts</h2>
            <button onClick={refresh} className="rounded-md bg-gray-900 text-white px-3 py-2 text-sm hover:bg-gray-800">Refresh</button>
          </div>
          <div key={refreshKey}>
            <Gallery />
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} PicShare</p>
          <p className="hidden sm:block">Built with love for photography</p>
        </div>
      </footer>
    </div>
  )
}

export default App
