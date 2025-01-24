import PlaylistForm from './components/PlaylistForm';
import SavedPlaylists from './components/SavedPlaylists';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Authentication from "@/app/components/Authentication";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="min-h-screen">
        <ThemeToggle />
        <div className="container mx-auto px-4 py-8">
          <PlaylistForm />
          <Authentication />
          <div className="mt-8">
            <SavedPlaylists />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
