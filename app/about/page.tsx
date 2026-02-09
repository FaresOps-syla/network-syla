import Link from 'next/link';

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        <p className="text-lg mb-8 text-gray-600">
          This is a well-structured Next.js project with TypeScript, App Router,
          and modern best practices.
        </p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
