import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>植物虫害AI识别系统</title>
  <meta name="description" content="基于深度学习的植物虫害智能识别系统，帮助农户快速诊断作物问题，提供科学防治建议" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App