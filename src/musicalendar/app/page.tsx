import PlaylistForm from './components/PlaylistForm';
import SavedPlaylists from './components/SavedPlaylists';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ThemeToggle />
        <div className="container mx-auto px-4 py-8">
          <PlaylistForm />
          <div className="mt-8">
            <SavedPlaylists />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
