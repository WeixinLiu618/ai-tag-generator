import './globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins} from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight:['100','300','700'],
  variable:'--font-poppins'
})
export const metadata: Metadata = {
  title: 'AI Tags Generator',
  description: 'AI Generator from images to text tags',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="nord">
      <body className={`${poppins.variable}`}>{children}</body>
    </html>
  )
}
