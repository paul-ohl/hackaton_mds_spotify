import PlaylistForm from './components/PlaylistForm';

export default function Home() {
  return (
    <div className="items-center justify-center">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* Form section */}
        <div>
          <PlaylistForm />
        </div>
      </main>
    </div>
  );
}
