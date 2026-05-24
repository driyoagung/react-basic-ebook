export function UserProfile({ name, age, job }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:-translate-y-1 hover:shadow-lg hover:border-slate-400 transition-all duration-200 flex flex-col gap-2 relative overflow-hidden">
      <h2 className="text-xl text-slate-900 font-semibold mb-1">{name}</h2>
      <div className="text-sm text-slate-600 flex flex-col gap-1.5">
        <p className="flex items-center gap-2">
          <span className="font-medium text-slate-900">Umur:</span> {age} tahun
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-slate-900">Pekerjaan:</span> {job}
        </p>
      </div>
    </div>
  );
}
