import connectToDatabase from '../../utils/db'; // Ensure this path is correct

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const db = await connectToDatabase();
      const result = await db.collection('users').insertOne({ email, password });
      res.status(201).json({ success: true, userId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}