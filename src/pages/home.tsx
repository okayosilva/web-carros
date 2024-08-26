import { Button } from '../components/button';
import { CardItem } from '../components/cardItem';
import { Input } from '../components/input';

export function Home() {
  return (
    <section>
      <form
        action=""
        className="flex h-24 items-center gap-4 rounded-lg bg-white px-4 py-5"
      >
        <Input placeholder="Encontre seu carro aqui" type="text" />
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
