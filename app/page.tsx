import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-4xl font-bold">Bienvenido a la App de Tickets</h1>
      <p className="text-lg">Haz clic en el botón para iniciar sesión.</p>
      <Link href="/login">
        <span className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Ir a Login
        </span>
      </Link>
    </div>
  );
}
