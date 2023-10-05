const { getBlogData } = require('./blogMiddleware');

const performSearch = async (searchQuery) => {
  try {
    const blogData = await getBlogData();

    const searchResults = blogData.filter(blog => {
      return blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return searchResults;
  } catch (error) {
    throw new Error('Error fetching or processing data. Please try again later.');
  }
};

module.exports = {
  performSearch
};
