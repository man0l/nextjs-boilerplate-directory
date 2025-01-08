import Link from 'next/link';
import SubmitButton from './SubmitButton';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold gradient-text">
            Saas Boilerplate Starters
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
              Categories
            </Link>
            <SubmitButton />
          </div>
        </div>
      </nav>
    </header>
  );
} 