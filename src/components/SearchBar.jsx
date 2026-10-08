/**
 * Komponen SearchBar
 * 
 * Konsep React yang digunakan:
 * 1. Controlled Component - input dikendalikan oleh state dari parent
 * 2. Props - menerima searchQuery, onSearchChange, resultCount, totalCount
 * 3. Conditional Rendering - menampilkan info jumlah hasil pencarian
 */
export function SearchBar({ searchQuery, onSearchChange, resultCount, totalCount }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          id="search-input"
          type="text"
          placeholder="Cari kontak berdasarkan nama, telepon, atau email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-colors"
        />
        {/* Tombol clear — hanya muncul jika ada teks pencarian */}
        {searchQuery && (
          <button
            id="btn-clear-search"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Info jumlah hasil pencarian — Conditional Rendering */}
      {searchQuery && (
        <p className="text-xs text-slate-400 px-1">
          Menampilkan <span className="font-medium text-slate-600">{resultCount}</span> dari{' '}
          <span className="font-medium text-slate-600">{totalCount}</span> kontak
        </p>
      )}
    </div>
  );
}
