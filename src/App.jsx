import { UserProfile } from './components/UserProfile';

function App() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-10 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Materi Bab 1: Components & Props</h1>
        <p className="text-lg text-slate-600">Berikut adalah contoh penggunaan komponen beserta props di React.</p>
      </header>
      
      {/* Container grid untuk menyusun kartu profil */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Memanggil komponen UserProfile dan mengirimkan data melalui props */}
        <UserProfile name="Budi Santoso" age={25} job="Software Engineer" />
        <UserProfile name="Siti Aminah" age={28} job="UI/UX Designer" />
        <UserProfile name="Andi Wijaya" age={22} job="Data Analyst" />
      </main>
    </div>
  )
}

export default App
