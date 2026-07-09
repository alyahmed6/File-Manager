import 'dotenv/config';
import { deleteBlogPost } from '../lib/blog-service';

(async () => {
  try {
    const deleted = await deleteBlogPost('crypto-research-habits');
    console.log('deleted:', deleted);
  } catch (error) {
    console.error('SERVICE ERROR:', error);
  }
})();
