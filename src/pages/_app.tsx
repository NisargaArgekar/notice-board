import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Notice Board | Internal Communications</title>
        <meta name="description" content="A polished notice board app built with Next.js, Prisma, and MySQL." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-transparent">
        <Navbar />
        <main className="mt-6">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
