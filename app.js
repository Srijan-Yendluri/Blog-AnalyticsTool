const express = require('express');
const { getBlogData, analyzeBlogData } = require('./blogMiddleware');
const { performSearch } = require('./blogSearch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const blogStatsMiddleware = async (req, res, next) => {
  try {
    const blogData = await getBlogData();
    const statistics = analyzeBlogData(blogData);
    req.blogStats = statistics;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.use('/api/blog-stats', blogStatsMiddleware);

app.get('/api/blog-stats', (req, res) => {
  res.json(req.blogStats);
});

app.get('/api/blog-search', async (req, res) => {
  const searchQuery = req.query.query;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const searchResults = await performSearch(searchQuery);
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
