export default async function handler(req, res) {
  const urls = [
    "https://flask-contest-api.onrender.com",
    "https://flask-jobs-api.onrender.com"
  ];

  try {
    const results = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);
        const text = await response.text();
        return { url, status: response.status, body: text };
      })
    );

    res.status(200).json({ success: true, results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
