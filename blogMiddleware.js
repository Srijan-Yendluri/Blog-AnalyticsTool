const axios = require('axios');
const lodash = require('lodash');

const getBlogData = async () => {
  try {
    const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
      headers: {
        'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching blog data. Please try again later.');
  }
};

const analyzeBlogData = (data) => {
  if (!Array.isArray(data)) {
    throw new Error('Invalid blog data format.');
  }

  const totalPosts = data.length;
  const longestTitleBlog = lodash.maxBy(data, 'title.length');
  const privacyBlogs = lodash.filter(data, (blog) => blog.title && blog.title.toLowerCase().includes('privacy'));
  const uniqueTitles = lodash.uniqBy(data, 'title');

  return {
    totalPosts,
    longestTitleBlog,
    numPrivacyBlogs: privacyBlogs.length,
    uniqueTitles
  };
};

module.exports = {
  getBlogData,
  analyzeBlogData
};
