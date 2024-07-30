import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;
    const db = client.db("nextjs");
  } catch (Exception) {
    return {
      props: { isConnected: false, wishes: [] },
    };
  }
  try {
    let res = await fetch("http://localhost:3000/api/people/");
    let wishes = await res.json();
    return {
      props: { isConnected: true, wishes: JSON.parse(JSON.stringify(wishes)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: true, wishes: [] },
    };
  }
}

export default function Home({
  isConnected,
  wishes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">{JSON.stringify(wishes)}</a>
        </h1>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">You are NOT connected to MongoDB.</h2>
        )}
      </main>

      <footer></footer>
    </div>
  );
}
