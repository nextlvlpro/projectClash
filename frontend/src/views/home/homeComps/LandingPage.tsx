import Button from "../../../components/ui/Button";

export default function LandingPage() {
  return (
    <div className="bg-background text-text min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-10">
        <h1 className="text-primary text-5xl font-extrabold">🏰 ClashHub ⚔️</h1>
        <p className="text-secondary mt-4 text-lg">
          Join the battle and build your ultimate empire!
        </p>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 max-w-4xl">
       <img
            src="landingPage/clashhub.jpg"
         />   
        <div className="text-center md:text-left">
          <h2 className="text-accent text-3xl font-bold">Lead Your Clan to Victory!</h2>
          <p className="mt-2 text-lg">
            Strategize, train troops, and conquer enemy bases to become the ultimate leader.
          </p>
          <Button
            variant="secondary"
            size="lg"
            >
            lets go
          </Button>
        </div>
      </section>
    </div>
  );
}
