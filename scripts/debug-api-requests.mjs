import fetch from 'node-fetch';

const url = 'http://localhost:3001/api/blogs/crypto-token-unlocks';
const body = {
  title: 'Test Title',
  category: 'Test',
  date: 'Jun 1, 2026',
  readTime: '1 min read',
  excerpt: 'Test excerpt',
  image: '/test.png',
  sections: [{ heading: 'Section', body: 'Test' }],
  takeaways: ['Test takeaway'],
};

(async () => {
  try {
    const putRes = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log('PUT status', putRes.status);
    console.log('PUT body', await putRes.text());

    const deleteRes = await fetch('http://localhost:3001/api/blogs/crypto-research-habits', {
      method: 'DELETE',
    });
    console.log('DELETE status', deleteRes.status);
    console.log('DELETE body', await deleteRes.text());
  } catch (err) {
    console.error(err);
  }
})();
