# Panduan Lengkap Belajar React JS (Basic hingga Advanced)

Dokumen ini berisi silabus dan daftar materi lengkap untuk mempelajari React JS dari nol hingga tingkat lanjut. Silabus ini disusun secara terstruktur agar mudah dipahami secara bertahap.

---

## 1. Tahap Basic (Dasar)
Tahap ini difokuskan untuk memahami konsep dasar React, bagaimana cara kerjanya, dan pembuatan komponen sederhana.

*   **1.1. Pengenalan React JS**
    *   Apa itu React JS?
    *   Sejarah dan ekosistem React.
    *   Konsep DOM vs Virtual DOM.
    *   Mengapa menggunakan React? (Keunggulan dan kelemahan).
*   **1.2. Persiapan Environment dan Instalasi**
    *   Instalasi Node.js dan NPM/Yarn/PNPM.
    *   Setup project React menggunakan Vite (seperti yang digunakan di project ini).
    *   Mengenal struktur folder standar pada project React (Vite).
    *   Cara menjalankan *development server*.
*   **1.3. JSX (JavaScript XML)**
    *   Apa itu JSX dan mengapa kita menggunakannya?
    *   Aturan dasar penulisan JSX.
    *   Menyisipkan *expression* JavaScript di dalam JSX (menggunakan `{}`).
    *   Atribut pada JSX (`className`, `htmlFor`, dll).
*   **1.4. React Components**
    *   Konsep dasar komponen pada React.
    *   Functional Components vs Class Components (Fokus ke Functional).
    *   Membuat dan menggunakan *Reusable Component* (Komponen yang dapat digunakan kembali).
    *   Komposisi komponen (Memasukkan komponen ke dalam komponen lain).
*   **1.5. Props (Properties)**
    *   Apa itu Props?
    *   Mengirim data dari *Parent Component* ke *Child Component*.
    *   Destructuring Props untuk kode yang lebih rapi.
    *   Menggunakan `children` props.
    *   *Default Props* dan validasi props (opsional dengan PropTypes atau TypeScript).
*   **1.6. Event Handling**
    *   Menangani event pada React (`onClick`, `onChange`, `onSubmit`, dll).
    *   Perbedaan event handling di React vs HTML biasa.
    *   Mengirim *arguments* atau *parameters* ke dalam *Event Handlers*.

---

## 2. Tahap Intermediate (Menengah)
Tahap ini membahas tentang pengelolaan *state* (data internal komponen), siklus hidup komponen (*lifecycle*), dan interaksi dengan API.

*   **2.1. State dan Hooks Dasar (`useState`)**
    *   Apa itu *State* dan perbedaannya dengan *Props*.
    *   Pengenalan Hooks di React.
    *   Menggunakan `useState` untuk menyimpan dan memperbarui data komponen.
    *   Update state berdasarkan *previous state*.
    *   Menangani state berbentuk *Object* dan *Array*.
*   **2.2. Rendering List dan Keys**
    *   Melakukan iterasi data (array) menggunakan `.map()`.
    *   Pentingnya atribut `key` pada element list.
    *   Best practice penggunaan `key`.
*   **2.3. Conditional Rendering**
    *   Merender komponen atau elemen berdasarkan kondisi tertentu.
    *   Menggunakan `if` statement.
    *   Menggunakan *Ternary Operator* (`kondisi ? benar : salah`).
    *   Menggunakan *Logical AND* (`&&`).
*   **2.4. Formulir (Forms) di React**
    *   Konsep *Controlled Components* (Komponen yang dikontrol oleh state React).
    *   Menangani input text, textarea, select, checkbox, dan radio button.
    *   Mengelola *multiple inputs* dengan satu state object.
    *   Menangani *submit* form dan mencegah *default behaviour*.
*   **2.5. Lifecycle dan `useEffect` Hook**
    *   Konsep *Component Lifecycle* (Mounting, Updating, Unmounting).
    *   Menggunakan `useEffect` untuk menangani *side effects*.
    *   Memahami *Dependency Array* pada `useEffect` (`[]`, `[state]`, tanpa array).
    *   Membersihkan *side effects* (*Cleanup function* pada unmounting).
*   **2.6. Data Fetching Dasar**
    *   Mengambil data dari REST API menggunakan `fetch` atau `axios`.
    *   Menangani status *loading* dan *error* saat fetching data.
    *   Menampilkan data hasil fetching ke layar.

---

## 3. Tahap Advanced (Lanjutan)
Tahap ini mencakup pengelolaan *state* yang kompleks, *routing*, optimasi performa, dan pembuatan *custom hooks*.

*   **3.1. Styling pada React**
    *   Inline Styles di React.
    *   CSS biasa dan CSS Modules.
    *   Pengenalan framework CSS untuk React (Tailwind CSS, Styled-Components, atau UI Library seperti Material UI / Chakra UI).
*   **3.2. React Router (Routing Client-Side)**
    *   Instalasi dan setup `react-router-dom`.
    *   Membuat *Routes* dan navigasi antar halaman (`<Link>`, `<NavLink>`).
    *   Mengambil parameter dari URL (`useParams`).
    *   Navigasi programatis (`useNavigate`).
    *   *Nested Routes* dan Layouting.
*   **3.3. State Management Global (Context API)**
    *   Masalah *Prop Drilling* (Mengoper props terlalu dalam).
    *   Membuat dan menyediakan *Context* (`createContext`, `<Context.Provider>`).
    *   Mengkonsumsi *Context* menggunakan `useContext`.
*   **3.4. Hooks Lanjutan**
    *   `useRef`: Menyimpan *mutable value* yang tidak memicu re-render dan manipulasi DOM secara langsung.
    *   `useReducer`: Alternatif `useState` untuk state management yang kompleks.
    *   `useMemo`: Mengoptimalkan performa dengan *memoization* nilai hasil kalkulasi.
    *   `useCallback`: Mengoptimalkan performa dengan *memoization* fungsi.
*   **3.5. Custom Hooks**
    *   Kapan dan mengapa membuat *Custom Hook*.
    *   Cara mengekstrak logika dari komponen menjadi *Custom Hook*.
    *   Contoh pembuatan: `useFetch`, `useWindowSize`, `useLocalStorage`.
*   **3.6. State Management Eksternal (Zustand / Redux Toolkit)**
    *   Pengenalan state manager modern (*Zustand* sangat disarankan untuk pemula karena simpel, atau *Redux Toolkit* untuk industri).
    *   Setup *store* dan mengakses state.
    *   Mengubah state global.
*   **3.7. Data Fetching Lanjutan (React Query / SWR)**
    *   Mengapa kita butuh *Server State Management*.
    *   Instalasi dan penggunaan dasar React Query (`useQuery`, `useMutation`).
    *   Caching, re-fetching, dan optimistic updates.
*   **3.8. Performance Optimization (Optimasi Performa)**
    *   *Code Splitting* dan *Lazy Loading* menggunakan `React.lazy` dan `Suspense`.
    *   Mencegah re-render yang tidak perlu menggunakan `React.memo`.

---

## 4. Penutup & Proyek Praktik
*   Latihan mengintegrasikan semua materi dengan membuat proyek nyata.
    *   *Saran Proyek 1*: To-Do List App (CRUD dasar).
    *   *Saran Proyek 2*: Aplikasi Pencari Film menggunakan API eksternal (OMDB / TMDB API).
    *   *Saran Proyek 3*: Aplikasi E-Commerce sederhana dengan keranjang belanja (Global State).
*   Panduan Deployment aplikasi Vite + React ke Vercel, Netlify, atau GitHub Pages.
