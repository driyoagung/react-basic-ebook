import { ContactCard } from './ContactCard';

/**
 * Komponen ContactList
 * 
 * Konsep React yang digunakan:
 * 1. Rendering List - menggunakan .map() untuk merender array data
 * 2. Key prop - setiap elemen dalam list harus punya key unik untuk optimasi React
 * 3. Conditional Rendering - menampilkan pesan jika list kosong
 * 4. Component Composition - menggunakan ContactCard di dalam ContactList
 * 5. Props drilling - meneruskan callback dari parent ke child (onEdit, onDelete)
 */
export function ContactList({ contacts, onEdit, onDelete }) {
  // Conditional Rendering: tampilkan pesan jika belum ada kontak
  if (contacts.length === 0) {
    return (
      <div id="empty-state" className="text-center py-12 px-6">
        <h3 className="text-sm font-medium text-slate-400 mb-1">Belum Ada Kontak</h3>
        <p className="text-xs text-slate-400">
          Tambahkan kontak pertamamu menggunakan form di atas.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header daftar kontak */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-semibold text-slate-800">
          Daftar Kontak
        </h2>
        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
          {contacts.length} kontak
        </span>
      </div>

      {/* 
        Rendering List dengan .map()
        PENTING: setiap element harus diberi prop `key` yang unik.
        Key membantu React mengidentifikasi element mana yang berubah, 
        ditambahkan, atau dihapus — sehingga proses update DOM lebih efisien.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}   // Key unik untuk setiap item
            contact={contact}   // Data kontak dikirim sebagai props
            onEdit={onEdit}     // Callback fungsi edit diteruskan ke child
            onDelete={onDelete} // Callback fungsi hapus diteruskan ke child
          />
        ))}
      </div>
    </div>
  );
}
