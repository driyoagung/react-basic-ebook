# Bab 2: State, Hooks, dan CRUD dengan localStorage

> **Proyek Praktik:** Aplikasi Manajemen Kontak (Create, Read, Update, Delete)

Bab ini menjelaskan konsep-konsep React yang digunakan dalam membangun aplikasi CRUD sederhana. Semua konsep di bawah ini diimplementasikan langsung pada kode di folder `src/`.

---

## Daftar Isi

1. [Apa itu State?](#1-apa-itu-state)
2. [useState Hook](#2-usestate-hook)
3. [Controlled Components (Form)](#3-controlled-components-form)
4. [Event Handling](#4-event-handling)
5. [Rendering List dengan .map()](#5-rendering-list-dengan-map)
6. [Key pada List](#6-key-pada-list)
7. [Conditional Rendering](#7-conditional-rendering)
8. [Lifting State Up](#8-lifting-state-up)
9. [useEffect Hook](#9-useeffect-hook)
10. [Custom Hook (useLocalStorage)](#10-custom-hook-uselocalstorage)
11. [Immutable State Update](#11-immutable-state-update)
12. [Derived State](#12-derived-state)
13. [Struktur Komponen CRUD](#13-struktur-komponen-crud)

---

## 1. Apa itu State?

**State** adalah data internal yang dimiliki oleh sebuah komponen. Berbeda dengan **props** yang dikirim dari luar (parent), state dikelola sendiri oleh komponen tersebut.

**Perbedaan Props vs State:**

| Aspek        | Props                          | State                         |
|:-------------|:-------------------------------|:------------------------------|
| Sumber       | Dikirim dari parent            | Dikelola sendiri oleh komponen |
| Mutabilitas  | Read-only (tidak bisa diubah)  | Bisa diubah dengan setter     |
| Fungsi       | Konfigurasi komponen           | Data dinamis / interaktif     |

**Kapan menggunakan state?**  
Setiap kali ada data yang bisa **berubah** dan perubahannya harus **terlihat di layar**, gunakan state.

Contoh di proyek ini: daftar kontak, data form input, dan query pencarian — semuanya adalah state.

---

## 2. useState Hook

`useState` adalah Hook bawaan React untuk membuat state di dalam Functional Component.

### Sintaks Dasar

```jsx
const [nilai, setNilai] = useState(nilaiAwal);
```

- `nilai` — state saat ini
- `setNilai` — fungsi untuk mengubah state (menyebabkan re-render)
- `nilaiAwal` — nilai pertama saat komponen di-mount

### Contoh di Proyek Ini

```jsx
// File: ContactForm.jsx
const [nama, setNama] = useState('');
const [telepon, setTelepon] = useState('');
const [email, setEmail] = useState('');
```

Setiap field input punya state masing-masing. Ketika user mengetik, `setNama` dipanggil → state berubah → komponen re-render → tampilan terupdate.

### Lazy Initialization

Jika initial value butuh kalkulasi berat (misalnya membaca dari localStorage), kita bisa memberikan **fungsi** sebagai argumen:

```jsx
// File: useLocalStorage.js
const [storedValue, setStoredValue] = useState(() => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
});
```

Fungsi ini hanya dijalankan **sekali** saat komponen pertama kali render, bukan setiap re-render. Ini disebut **lazy initialization**.

---

## 3. Controlled Components (Form)

**Controlled Component** adalah elemen form (`<input>`, `<textarea>`, `<select>`) yang nilainya dikendalikan sepenuhnya oleh state React.

### Cara Kerja

```
User mengetik → onChange dipanggil → setState → re-render → value terupdate
```

### Contoh

```jsx
// File: ContactForm.jsx
<input
  type="text"
  value={nama}              // Nilai input SELALU sama dengan state
  onChange={(e) => setNama(e.target.value)}  // Setiap ketikan update state
/>
```

**Mengapa controlled component?**
- Satu sumber kebenaran (single source of truth) — state React
- Mudah memvalidasi, memanipulasi, dan mengirim data
- React selalu "tahu" isi form saat ini

---

## 4. Event Handling

React menangani event sedikit berbeda dari HTML biasa:

| HTML biasa                       | React                           |
|:---------------------------------|:--------------------------------|
| `onclick="handleClick()"`        | `onClick={handleClick}`         |
| Nama event lowercase             | Nama event camelCase            |
| String                           | Fungsi (referensi)              |

### Contoh di Proyek Ini

```jsx
// File: ContactForm.jsx — Event onSubmit pada form
const handleSubmit = (e) => {
  e.preventDefault(); // Mencegah reload halaman
  onSubmit({ id: Date.now(), nama, telepon, email });
};

<form onSubmit={handleSubmit}>
  ...
</form>
```

```jsx
// File: ContactCard.jsx — Mengirim argumen ke event handler
<button onClick={() => onEdit(contact)}>Edit</button>
<button onClick={() => onDelete(contact.id)}>Hapus</button>
```

> **Catatan:** Saat perlu mengirim argumen, bungkus handler dalam arrow function: `() => fungsi(argumen)`. Jika langsung ditulis `onClick={fungsi(argumen)}`, fungsi akan langsung terpanggil saat render!

---

## 5. Rendering List dengan .map()

Untuk menampilkan data berupa array, kita menggunakan method `.map()` untuk mengubah setiap item menjadi elemen JSX.

```jsx
// File: ContactList.jsx
{contacts.map((contact) => (
  <ContactCard
    key={contact.id}
    contact={contact}
    onEdit={onEdit}
    onDelete={onDelete}
  />
))}
```

**Alur:**
1. `contacts` adalah array of objects
2. `.map()` mengiterasi setiap object
3. Setiap iterasi mengembalikan komponen `<ContactCard />`
4. React merender semua komponen hasil `.map()`

---

## 6. Key pada List

Setiap elemen dalam list **wajib** memiliki prop `key` yang unik.

```jsx
<ContactCard key={contact.id} ... />
```

**Mengapa `key` penting?**
- React menggunakan `key` untuk mengidentifikasi elemen mana yang berubah, ditambahkan, atau dihapus
- Tanpa `key` yang tepat, React akan me-render ulang seluruh list (tidak efisien)
- **Jangan gunakan index array sebagai key** jika urutan bisa berubah (karena tambah/hapus)

Di proyek ini, kita menggunakan `Date.now()` sebagai ID unik saat membuat kontak baru.

---

## 7. Conditional Rendering

Menampilkan elemen yang berbeda berdasarkan kondisi tertentu.

### Metode 1: Ternary Operator

```jsx
// File: ContactForm.jsx
{isEditing ? '💾 Simpan Perubahan' : '➕ Tambah Kontak'}
```

### Metode 2: Logical AND (&&)

```jsx
// File: ContactCard.jsx — email hanya ditampilkan jika ada
{contact.email && (
  <p>✉️ {contact.email}</p>
)}
```

### Metode 3: Early Return

```jsx
// File: ContactList.jsx — tampilkan pesan jika list kosong
if (contacts.length === 0) {
  return <div>Belum ada kontak</div>;
}
// ... render list kontak
```

---

## 8. Lifting State Up

Ketika beberapa child component perlu **berbagi atau memodifikasi data yang sama**, state harus di-"angkat" ke parent component terdekat yang menjadi leluhur bersama.

### Diagram Aliran Data di Proyek Ini

```
ContactManager (Parent)
├── State: contacts, editContact, searchQuery
├── Fungsi: handleSubmit, handleDelete, handleEdit
│
├── ContactForm (Child)
│   └── Menerima: onSubmit, editContact, onCancelEdit (via Props)
│
├── SearchBar (Child)
│   └── Menerima: searchQuery, onSearchChange (via Props)
│
└── ContactList (Child)
    └── Menerima: contacts, onEdit, onDelete (via Props)
        │
        └── ContactCard (Grandchild)
            └── Menerima: contact, onEdit, onDelete (via Props)
```

**Prinsip:**
- Data mengalir **ke bawah** (parent → child) melalui **props**
- Aksi mengalir **ke atas** (child → parent) melalui **callback props**
- Parent adalah "single source of truth" (satu sumber kebenaran)

---

## 9. useEffect Hook

`useEffect` digunakan untuk menangani **side effects** — operasi yang terjadi "di luar" render React, seperti:
- Menyimpan data ke localStorage
- Fetch data dari API
- Mengubah DOM secara manual
- Subscribe ke event

### Sintaks

```jsx
useEffect(() => {
  // Kode side effect
}, [dependency1, dependency2]);
```

### Dependency Array

| Dependency Array    | Kapan Dijalankan                           |
|:--------------------|:-------------------------------------------|
| Tidak ada `[]`      | Setiap kali komponen re-render             |
| `[]` (array kosong) | Hanya sekali saat komponen di-mount        |
| `[state]`           | Saat `state` berubah nilainya              |

### Contoh di Proyek Ini

```jsx
// File: useLocalStorage.js — Simpan ke localStorage setiap state berubah
useEffect(() => {
  window.localStorage.setItem(key, JSON.stringify(storedValue));
}, [key, storedValue]);  // Jalan setiap key atau storedValue berubah
```

```jsx
// File: ContactForm.jsx — Isi form saat masuk mode edit
useEffect(() => {
  if (editContact) {
    setNama(editContact.nama);
    setTelepon(editContact.telepon);
    setEmail(editContact.email);
  }
}, [editContact]);  // Jalan setiap editContact berubah
```

---

## 10. Custom Hook (useLocalStorage)

**Custom Hook** adalah fungsi JavaScript yang namanya diawali `use` dan di dalamnya menggunakan hooks bawaan React. Custom Hook memungkinkan kita **mengekstrak dan berbagi logika stateful** antar komponen.

### Implementasi

```jsx
// File: src/hooks/useLocalStorage.js
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
```

### Penggunaan

```jsx
// File: ContactManager.jsx
const [contacts, setContacts] = useLocalStorage('contacts', []);
```

**Keuntungan Custom Hook:**
- Logika localStorage tidak perlu ditulis berulang
- Hook ini bisa dipakai di komponen manapun
- Interface-nya sama dengan `useState` — jadi mudah dipahami

---

## 11. Immutable State Update

Di React, kita **tidak boleh mengubah state secara langsung** (mutasi). Kita harus membuat **salinan baru** dari data.

### ❌ Salah (Mutasi Langsung)

```jsx
contacts.push(newContact);      // JANGAN! Ini mutasi
setContacts(contacts);           // React tidak tahu ada perubahan
```

### ✅ Benar (Immutable Update)

```jsx
// CREATE — tambahkan item baru dengan spread operator
setContacts([newContact, ...contacts]);

// UPDATE — ganti item tertentu dengan .map()
setContacts(contacts.map(c => c.id === id ? updatedContact : c));

// DELETE — hapus item tertentu dengan .filter()
setContacts(contacts.filter(c => c.id !== id));
```

**Mengapa harus immutable?**
- React membandingkan referensi object/array (bukan isinya) untuk menentukan apakah perlu re-render
- Jika referensi sama (karena mutasi), React menganggap tidak ada perubahan → tampilan tidak terupdate

---

## 12. Derived State

**Derived state** adalah nilai yang **dihitung dari state yang sudah ada**, bukan state baru yang terpisah.

```jsx
// File: ContactManager.jsx
// BUKAN state baru — ini computed/derived dari state `contacts` dan `searchQuery`
const filteredContacts = contacts.filter((contact) =>
  contact.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
  contact.telepon.includes(searchQuery)
);
```

**Kapan menggunakan derived state?**  
Jika sebuah nilai bisa dihitung dari state lain, **jangan** buat state baru — cukup hitung saat render. Ini mencegah state yang tidak sinkron.

---

## 13. Struktur Komponen CRUD

Berikut adalah diagram arsitektur komponen dan file yang digunakan:

```
src/
├── App.jsx                          ← Entry point, merender ContactManager
├── hooks/
│   └── useLocalStorage.js           ← Custom Hook untuk localStorage
└── components/
    ├── ContactManager.jsx           ← Parent component (state & logika CRUD)
    ├── ContactForm.jsx              ← Form input (Create & Update)
    ├── ContactList.jsx              ← Daftar kontak (Read) + rendering list
    ├── ContactCard.jsx              ← Kartu kontak individual + tombol aksi
    └── SearchBar.jsx                ← Input pencarian (filter/read)
```

### Alur Operasi CRUD

| Operasi    | Komponen          | Cara Kerja                                            |
|:-----------|:------------------|:------------------------------------------------------|
| **Create** | ContactForm       | Form diisi → `onSubmit` dipanggil → item baru ditambah ke array |
| **Read**   | ContactList/Card  | Array contacts di-`.map()` menjadi list `ContactCard` |
| **Update** | ContactForm       | Klik Edit → form terisi data lama → submit update     |
| **Delete** | ContactCard       | Klik Hapus → konfirmasi → `.filter()` hapus dari array |
| **Search** | SearchBar         | Ketik query → `filteredContacts` dihitung ulang (derived state) |

---

## Ringkasan Konsep yang Dipelajari

| No | Konsep                | Hook/API              | File Contoh           |
|:---|:----------------------|:----------------------|:----------------------|
| 1  | State                 | `useState`            | ContactForm.jsx       |
| 2  | Side Effects          | `useEffect`           | useLocalStorage.js    |
| 3  | Custom Hook           | `useLocalStorage`     | useLocalStorage.js    |
| 4  | Controlled Components | `useState` + onChange  | ContactForm.jsx       |
| 5  | Event Handling        | onClick, onSubmit     | ContactCard.jsx       |
| 6  | Rendering List        | `.map()`              | ContactList.jsx       |
| 7  | Key pada List         | `key={id}`            | ContactList.jsx       |
| 8  | Conditional Rendering | `&&`, `? :`, `if`     | ContactCard.jsx       |
| 9  | Lifting State Up      | Callback props        | ContactManager.jsx    |
| 10 | Immutable Update      | spread, map, filter   | ContactManager.jsx    |
| 11 | Derived State         | computed value         | ContactManager.jsx    |

---

> **Selanjutnya (Bab 3):** Context API & React Router — membangun aplikasi multi-halaman dengan state management global.
