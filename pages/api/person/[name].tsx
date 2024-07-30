import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("nextjs");
  const { name } = req.query.toLowerCase();
  if (req.method === "GET") {
    const movies = await db.collection("wishes").find({ Name: name }).toArray();
    res.json(movies);
  } else if (req.method === "PUT") {
    await db.collection("wishes").updateOne({ Name: name }, { $set: req.body });
    res.json(req.body);
  } else if (req.method === "DELETE") {
    await db.collection("wishes").deleteOne({ Name: name });
    res.json(req.body);
  }
};
