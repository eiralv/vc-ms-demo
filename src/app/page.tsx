import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <button className='bg-blue-500 p-3'>
        <Link href="/issuer">Issue credentials</Link>
      </button>
    </main>
  )
}
