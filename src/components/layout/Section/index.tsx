interface Props {
  id?: string
  title: string
  children: React.ReactNode
}

const Section: React.FC<Props> = ({ id, title, children }) => {
  return (
    <section
      id={id || title.replace(' ', '-').toLowerCase()}
      className="flex max-w-full flex-col items-center justify-center gap-15 border-b border-white/5 px-4 text-center sm:px-8 lg:px-12 lg:py-32"
    >
      <h1 className="text-4xl font-bold tracking-[0.25em] text-sky-300 sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {children}
    </section>
  )
}

export default Section
