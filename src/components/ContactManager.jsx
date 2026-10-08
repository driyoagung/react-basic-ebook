import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { SearchBar } from './SearchBar';

/**
 * Komponen ContactManager (Parent / Container Component)
 * 
 * Konsep React yang digunakan:
 * 1. Lifting State Up - semua state dikelola di sini, lalu dikirim ke child via props
 * 2. Custom Hook (useLocalStorage) - menyimpan data kontak secara persisten
 * 3. useState - mengelola state editContact dan searchQuery
 * 4. Callback Pattern - fungsi CRUD dikirim ke child sebagai props
 * 5. Component Composition - menyusun UI dari komponen-komponen kecil
 * 6. Derived State - contacts difilter menjadi filteredContacts (tidak perlu state baru)
 * 7. Immutable State Update - state array diupdate dengan cara immutable (spread, filter, map)
 */
export function ContactManager() {
  // Custom Hook: state contacts otomatis tersimpan di localStorage
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  // State untuk menyimpan kontak yang sedang diedit (null jika tidak sedang edit)
  const [editContact, setEditContact] = useState(null);

  // State untuk query pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // === OPERASI CRUD ===

  // CREATE & UPDATE: menambah atau memperbarui kontak
  const handleSubmit = (contactData) => {
    if (editContact) {
      // UPDATE: ganti data kontak yang sesuai ID-nya
      // Menggunakan .map() — cara immutable untuk update item dalam array
      setContacts(contacts.map((c) =>
        c.id === contactData.id ? contactData : c
      ));
      setEditContact(null); // keluar dari mode edit
    } else {
      // CREATE: tambahkan kontak baru ke awal array
      // Menggunakan spread operator — cara immutable untuk menambah item ke array
      setContacts([contactData, ...contacts]);
    }
  };

  // DELETE: menghapus kontak berdasarkan ID
  const handleDelete = (id) => {
    // Konfirmasi sebelum menghapus
    if (window.confirm('Yakin ingin menghapus kontak ini?')) {
      // Menggunakan .filter() — cara immutable untuk menghapus item dari array
      setContacts(contacts.filter((c) => c.id !== id));
      
      // Jika sedang edit kontak yang dihapus, keluar dari mode edit
      if (editContact && editContact.id === id) {
        setEditContact(null);
      }
    }
  };

  // READ (Edit mode): set kontak yang ingin diedit
  const handleEdit = (contact) => {
    setEditContact(contact);
    // Scroll ke form
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Batalkan edit
  const handleCancelEdit = () => {
    setEditContact(null);
  };

  // DERIVED STATE: filter kontak berdasarkan search query
  // Ini bukan state baru, tapi nilai turunan (derived) dari state yang sudah ada
  const filteredContacts = contacts.filter((contact) =>
    contact.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.telepon.includes(searchQuery) ||
    (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto p-6 sm:p-10 font-sans min-h-screen">
      {/* Header */}
      <header className="mb-2">
        <p className="text-xs font-medium text-indigo-600 mb-1 tracking-wide uppercase">
          Bab 2: State, Hooks & CRUD
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 tracking-tight">
          Manajemen Kontak
        </h1>
        <p className="text-sm text-slate-500">
          Aplikasi CRUD sederhana menggunakan React Hooks dan localStorage.
        </p>
      </header>

      {/* Form Tambah / Edit Kontak */}
      <ContactForm
        onSubmit={handleSubmit}
        editContact={editContact}
        onCancelEdit={handleCancelEdit}
      />

      {/* Search Bar — hanya tampil jika ada kontak */}
      {contacts.length > 0 && (
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredContacts.length}
          totalCount={contacts.length}
        />
      )}

      {/* Daftar Kontak */}
      <ContactList
        contacts={filteredContacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Footer info */}
      <footer className="text-center text-xs text-slate-400 pb-6 mt-2">
        <p>Data tersimpan di <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">localStorage</code> browser</p>
      </footer>
    </div>
  );
}
