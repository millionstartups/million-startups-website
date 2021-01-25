import Link from 'next/link'

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
      <Link href='/'><a>Home</a></Link>{ '    '}
      <Link href='/blog'><a>Blog</a></Link>{ '    '}
      <Link href='/'><a>Episodes</a></Link>{ '    '}
      <Link href='/contact'><a>Contact Us</a></Link>{ '    '}
      </h4>
    </section>
  )
}
