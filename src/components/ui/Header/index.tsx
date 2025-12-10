import { Link } from '@tanstack/react-router'
import { useState } from 'react'

interface Props {
  navItems: Array<{ href: string; label: string }>
}

const Header: React.FC<Props> = ({ navItems }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 left-0 z-40 flex w-full items-center justify-between gap-4 bg-[rgba(0,0,20,0.85)] px-5 py-4 sm:px-8 lg:px-12 md:py-7 backdrop-blur-md">
      <div className="text-xl font-bold tracking-[0.2em] text-sky-300 md:text-3xl">
        MY PAGE
      </div>

      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex h-8 w-8 flex-col justify-between md:hidden"
      >
        <span className="h-[3px] w-full rounded bg-white transition" />
        <span className="h-[3px] w-full rounded bg-white transition" />
        <span className="h-[3px] w-full rounded bg-white transition" />
      </button>

      <nav
        id="menu"
        className={`absolute right-5 top-full mt-3 flex flex-col gap-3 rounded-2xl bg-[rgba(0,0,20,0.95)] px-4 py-3 shadow-xl transition-all duration-300 ease-out ${
          menuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        } md:static md:mt-0 md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:opacity-100 md:translate-y-0 md:pointer-events-auto`}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            to="."
            hash={item.href.replace('#', '')}
            onClick={() => setMenuOpen(false)}
            className="px-2 py-1 text-sm font-medium tracking-[0.15em] text-white transition-colors hover:text-sky-300 md:text-xl"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default Header
