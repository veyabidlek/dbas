import Link from "next/link";

export default function Home() {
  const tables = [
    { name: "Country Table", href: "/country" },
    { name: "Users Table", href: "/users" },
    { name: "Disease Table", href: "/disease" },
    { name: "Patients Table", href: "/patients" },
    { name: "Doctors Table", href: "/doctors" },
    { name: "Public Servant Table", href: "/public-servants" },
    { name: "Patient Disease Table", href: "/patient-disease" },
    { name: "Record Table", href: "/record" },
    { name: "Specialize Table", href: "/specialize" },
    { name: "Disease Type Table", href: "/disease-type" },
    { name: "Disease Discover Table", href: "/discover" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center py-4 bg-gray-200 rounded-t-lg">
          Database Tables
        </h1>
        <div className="p-6 space-y-4">
          {tables.map((table) => (
            <Link
              key={table.href}
              href={table.href}
              className="block text-center py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {table.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
