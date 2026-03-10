import CalendarImage from "./components/CalendarImage";
import TodayDate from "./components/TodayDate";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center py-8 px-16 gap-8 sm:items-start">
        <CalendarImage />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            diary of theLiftedGifted — <TodayDate />
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            cruisin down the street in my 64, jockin the freaks, clocking the dough, went to the park to get the scoop, knuckleheads out there cold shooting some hoops, a car pulls up who can it be, a fresh El Camino rolled, Kilo G. and a fade to black, hittin switches, smokin sacks, and tricks up the sleeve
          </p>
        </div>

      </main>
    </div>
  );
}

