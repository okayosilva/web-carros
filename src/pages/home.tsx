import { Button } from '../components/button';

export function Home() {
  return (
    <section>
      <form
        action=""
        className="flex h-24 items-center gap-4 rounded-lg bg-white px-4 py-5"
      >
        <input type="text" className="h-12 w-full border" />
        <Button type="submit">Search</Button>
      </form>
    </section>
  );
}
