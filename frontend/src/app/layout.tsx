import './globals.css'
import { ApolloWrapper } from "@/lib/apollo-wrapper";

export const metadata = {
  title: 'Pokemon Index App',
  description: 'Pokemon App for Learning Basical IT Knowledge',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp">
      <body>
        <ApolloWrapper>
          {children}
          </ApolloWrapper>
        </body>
    </html>
  )
}
