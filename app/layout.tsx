// app/layout.tsx
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import LayoutClient from "@/components/layout-client"

export const metadata = {
  title: "WISHKE - Real Estate Platform",
  description: "Connect with real estate professionals and find your dream property",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LayoutClient>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LayoutClient>
      </body>
    </html>
  )
}
