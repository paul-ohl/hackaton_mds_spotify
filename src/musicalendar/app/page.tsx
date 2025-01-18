import PlaylistForm from './components/PlaylistForm';
import SavedPlaylists from './components/SavedPlaylists';

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <PlaylistForm />
          <SavedPlaylists />
        </div>
      </main>
    </div>
  );
}
