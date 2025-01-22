import PlaylistForm from './components/PlaylistForm';
import SavedPlaylists from './components/SavedPlaylists';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <PlaylistForm />
        <div className="mt-8">
          <SavedPlaylists />
        </div>
      </div>
    </main>
  );
}
