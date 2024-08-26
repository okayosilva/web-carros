export function CardItem() {
  return (
    <section className="flex h-[465px] w-full flex-col overflow-hidden rounded-lg bg-white drop-shadow-md">
      <img
        src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202408/20240802/audi-a3-2-0-40-tfsi-mhev-sedan-s-line-stronic-wmimagem19162495038.webp?s=fill&w=552&h=414&q=60"
        alt=""
        className="h-72 w-full cursor-pointer rounded-lg object-cover transition-all duration-300 hover:scale-105"
      />

      <article className="flex flex-1 flex-col justify-between gap-8 px-3 py-4">
        <div className="">
          <h2 className="font-bold text-zinc-900">Audi A3</h2>
          <p className="text-zinc-800">2023/2024 26000km</p>
        </div>

        <div className="mx-0 w-full">
          <p className="mb-2 text-2xl font-bold text-zinc-900">R$ 239.000</p>
          <div className="-mx-3 h-px bg-zinc-300"></div>
          <p className="mt-2 text-zinc-800">São Paulo - SP</p>
        </div>
      </article>
    </section>
  );
}
