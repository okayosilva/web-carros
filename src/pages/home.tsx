import { Button } from '../components/button';
import { CardItem } from '../components/cardItem';

export function Home() {
  return (
    <section>
      <form
        action=""
        className="flex h-24 items-center gap-4 rounded-lg bg-white px-4 py-5"
      >
        <input
          placeholder="Encontre seu carro aqui"
          type="text"
          className="h-12 w-full rounded-lg border border-gray-400 px-4 outline-none placeholder:text-sm md:placeholder:text-base"
          name="search"
        />
        <Button type="submit">Buscar</Button>
      </form>

      <section className="mt-4 md:mt-16">
        <h1 className="text-center text-2xl font-bold text-zinc-900">
          Carros novos e usados em todo o Brasil
        </h1>
        <main className="mx-auto mt-4 grid w-full max-w-7xl grid-cols-1 gap-6 pb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </main>
      </section>
    </section>
  );
}
