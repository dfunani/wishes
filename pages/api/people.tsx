import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("nextjs");
    if (req.method === "GET") {
      const movies = await db.collection("wishes").find({}).toArray();
      res.json(movies);
      if (!movies) res.json({});
    } else if (req.method === "POST")
      await db.collection("wishes").insertOne(req.body);
    res.json(req.body);
  } catch (e) {
    console.error(e);
  }
};
