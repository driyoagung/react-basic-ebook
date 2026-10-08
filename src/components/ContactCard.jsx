/**
 * Komponen ContactCard
 * 
 * Konsep React yang digunakan:
 * 1. Props - menerima data kontak dan callback fungsi dari parent
 * 2. Destructuring Props - { contact, onEdit, onDelete }
 * 3. Event Handling - onClick untuk tombol edit dan hapus
 * 4. Reusable Component - komponen ini dirender untuk setiap kontak dalam list
 */
export function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div
      id={`contact-${contact.id}`}
      className="bg-white border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
    >
      {/* Info Kontak */}
      <div className="flex flex-col gap-1 mb-3">
        <h3 className="text-sm font-semibold text-slate-800">
          {contact.nama}
        </h3>
        <p className="text-sm text-slate-500">
          {contact.telepon}
        </p>
        {/* Conditional Rendering: tampilkan email hanya jika ada */}
        {contact.email && (
          <p className="text-sm text-slate-500">
            {contact.email}
          </p>
        )}
      </div>

      {/* Tombol Aksi — Event Handling: memanggil fungsi dari parent via props */}
      <div className="flex gap-2">
        <button
          id={`btn-edit-${contact.id}`}
          onClick={() => onEdit(contact)}
          className="flex-1 px-3 py-1.5 rounded-md text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 hover:border-indigo-200 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          id={`btn-delete-${contact.id}`}
          onClick={() => onDelete(contact.id)}
          className="flex-1 px-3 py-1.5 rounded-md text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 hover:border-red-200 transition-colors cursor-pointer"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
