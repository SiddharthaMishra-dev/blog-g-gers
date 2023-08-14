'use client'

import Image from 'next/image'
import {Button} from '@nextui-org/react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Blog-g-ers</h1>
      <h2>Share, who you are</h2>
      <Button color="primary">
        Get started
      </Button>
    </main>
  )
}
