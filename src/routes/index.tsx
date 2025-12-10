import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@/lib/microcms'
import WorkList from '@/components/ui/WorksList'
import Section from '@/components/layout/Section'
import { ACCOUNTS } from '@/constants'
import Header from '@/components/ui/Header'

export const Route = createFileRoute('/')({
  loader: async () => {
    const client = createClient()
    const works = await client.getList({
      endpoint: 'works',
      queries: { limit: 4 },
    })
    const introduction = await client.getObject({
      endpoint: 'self',
    })
    return { works: works.contents, introduction }
  },
  shouldReload: false,
  component: App,
})

function App() {
  const { works, introduction } = Route.useLoaderData()
  const navItems = [
    { href: 'home', label: 'HOME' },
    { href: 'aboutme', label: 'ABOUT ME' },
    { href: 'work', label: 'WORK' },
    { href: 'contact', label: 'CONTACT' },
  ]
  const contactItems = [
    {
      label: 'Email',
      value: ACCOUNTS.EMAIL,
      href: `mailto:${ACCOUNTS.EMAIL}`,
      external: false,
    },
    {
      label: 'Instagram',
      value: ACCOUNTS.INSTAGRAM,
      href: `https://www.instagram.com/${ACCOUNTS.INSTAGRAM.replace('@', '')}`,
      external: true,
    },
  ]

  return (
    <div className="min-h-dvh h-full bg-black text-white flex flex-col">
      <Header navItems={navItems} />

      <main className="flex flex-col items-center gap-10">
        <Section id={navItems[0].href} title='VideoCreator "YANO SOTA"'>
          <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <iframe
              src="https://player.vimeo.com/video/1145338528?title=0&byline=0&portrait=0&badge=0&controls=0&autoplay=1&muted=1&loop=1"
              width="1920"
              height="1080"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              title="HP"
              loading="lazy"
              className="aspect-video w-full object-cover"
            ></iframe>
          </div>
        </Section>

        <Section id={navItems[1].href} title="ABOUT ME">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-14">
            <div className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px]">
              <img
                src={introduction.picture.url}
                alt={introduction.picture.alt || 'YANO SOTA portrait'}
                width={introduction.picture.width}
                height={introduction.picture.height}
                loading="lazy"
                className="aspect-3/4 w-full rounded-2xl border-2 border-sky-300 object-cover shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              />
            </div>
            <div className="w-full max-w-2xl text-center text-base leading-8 flex flex-col gap-5 text-gray-100 items-center md:items-start">
              <p>京都府出身／2005年5月22日生</p>
              <p className="whitespace-pre-wrap">{introduction.introduction}</p>
              <p className="flex gap-3">
                <span>[座右の銘]</span>
                <span className="flex gap-1">
                  <span>成せば成る</span>
                  <span>成さねば成らぬ</span>
                  <span>何事も</span>
                </span>
              </p>
              <p>監督/プロダクションマネージャー/撮影(技術全般)/編集</p>
            </div>
          </div>
        </Section>

        <Section id={navItems[2].href} title="WORK">
          <WorkList works={works} />
        </Section>

        <Section id={navItems[3].href} title="CONTACT">
          <p className="text-base sm:text-lg text-gray-100">
            お仕事のご依頼・お問い合わせはこちらへ
          </p>
          <div className="w-full max-w-2xl grid gap-4 text-base sm:text-lg md:text-xl text-gray-100">
            {contactItems.map(({ label, value, href, external }) => (
              <div
                key={label}
                className="grid grid-cols-[minmax(80px,140px)_minmax(0,1fr)] items-center gap-6"
              >
                <span className="font-mono text-sm uppercase tracking-[0.3em] text-gray-400">
                  {label}
                </span>
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="font-mono text-base normal-case tracking-widest underline-offset-4 decoration-transparent hover:decoration-sky-300 hover:text-sky-300"
                >
                  {value}
                </a>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  )
}
