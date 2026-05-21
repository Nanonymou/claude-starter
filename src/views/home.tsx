import { HomeShowcase } from "@/views/home-showcase";

/**
 * Home view — a Server Component. The page shell renders on the server; the
 * animation showcase is isolated in the `HomeShowcase` client leaf.
 */
export const HomeView = () => {
  return (
    <main className="z-1 w-screen min-h-[200lvh] flex flex-col items-center justify-center gap-50 bg-white text-black">
      <HomeShowcase />
    </main>
  );
};
