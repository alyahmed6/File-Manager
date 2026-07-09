import 'dotenv/config';
import { deleteBlogPost } from '../lib/blog-service.mjs';

(async () => {
  try {
    const result = await deleteBlogPost('crypto-research-habits');
    console.log('deleted?', result);
  } catch (error) {
    console.error('SERVICE ERROR:', error);
  }
})();
