import { useState, useEffect } from 'react';

/**
 * Komponen ContactForm
 * 
 * Konsep React yang digunakan:
 * 1. Controlled Components - setiap input dikontrol oleh state React
 * 2. useState - menyimpan data form (nama, telepon, email)
 * 3. Props - menerima callback onSubmit dan data editContact dari parent
 * 4. Event Handling - onChange untuk input, onSubmit untuk form
 * 5. useEffect - mengisi form saat mode edit
 * 6. Conditional Rendering - menampilkan teks tombol berbeda untuk create/edit
 */
export function ContactForm({ onSubmit, editContact, onCancelEdit }) {
  // State untuk setiap field form — ini adalah "Controlled Components"
  const [nama, setNama] = useState('');
  const [telepon, setTelepon] = useState('');
  const [email, setEmail] = useState('');

  // useEffect: mengisi form ketika user ingin mengedit kontak
  // Dependency array [editContact] artinya effect ini jalan setiap editContact berubah
  useEffect(() => {
    if (editContact) {
      setNama(editContact.nama);
      setTelepon(editContact.telepon);
      setEmail(editContact.email);
    }
  }, [editContact]);

  // Handler saat form disubmit
  const handleSubmit = (e) => {
    // Mencegah reload halaman (default behaviour form HTML)
    e.preventDefault();

    // Validasi sederhana
    if (!nama.trim() || !telepon.trim()) return;

    // Kirim data ke parent melalui props callback
    onSubmit({
      id: editContact ? editContact.id : Date.now(), // gunakan timestamp sebagai ID unik
      nama: nama.trim(),
      telepon: telepon.trim(),
      email: email.trim(),
    });

    // Reset form setelah submit
    resetForm();
  };

  const resetForm = () => {
    setNama('');
    setTelepon('');
    setEmail('');
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  // Cek apakah sedang dalam mode edit
  const isEditing = Boolean(editContact);

  return (
    <form onSubmit={handleSubmit} id="contact-form" className="bg-white border border-slate-200 rounded-lg p-6">
      <h2 className="text-base font-semibold text-slate-800 mb-4">
        {isEditing ? 'Edit Kontak' : 'Tambah Kontak Baru'}
      </h2>
      
      <div className="flex flex-col gap-3">
        {/* Input Nama — Controlled Component: value selalu sinkron dengan state */}
        <div className="flex flex-col gap-1">
          <label htmlFor="input-nama" className="text-sm font-medium text-slate-600">
            Nama <span className="text-red-400">*</span>
          </label>
          <input
            id="input-nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-colors"
          />
        </div>

        {/* Input Telepon */}
        <div className="flex flex-col gap-1">
          <label htmlFor="input-telepon" className="text-sm font-medium text-slate-600">
            No. Telepon <span className="text-red-400">*</span>
          </label>
          <input
            id="input-telepon"
            type="tel"
            placeholder="Contoh: 081234567890"
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
            required
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-colors"
          />
        </div>

        {/* Input Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="input-email" className="text-sm font-medium text-slate-600">
            Email
          </label>
          <input
            id="input-email"
            type="email"
            placeholder="contoh@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-400 transition-colors"
          />
        </div>

        {/* Tombol Submit */}
        <div className="flex gap-2 mt-2">
          <button
            id="btn-submit"
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors cursor-pointer"
          >
            {isEditing ? 'Simpan Perubahan' : 'Tambah Kontak'}
          </button>

          {/* Tombol Batal hanya muncul saat mode edit — Conditional Rendering */}
          {isEditing && (
            <button
              id="btn-cancel"
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
