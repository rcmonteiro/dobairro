export default function Testimonials() {
  return (
    <section className="flex max-w-5xl flex-col py-16">
      <div className="m-auto flex flex-col gap-4 ">
        <p className="text-center text-5xl text-blue-500">
          Histórias de sucesso
        </p>
      </div>
      <div className="mt-8 grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10"
          >
            <p className="mt-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <h3 className="text-lg">Pessoa {index}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
