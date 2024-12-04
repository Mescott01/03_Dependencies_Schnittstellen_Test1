import { Express, Request, Response } from 'express';
import { db } from './src/database'; // Import the database object
import { postsTable } from './src/db/schema'; // Import the table schema
import { eq } from 'drizzle-orm';


export function initializeAPI(app: Express) {
  // GET endpoint: Fetch all posts from the database
  app.get('/posts', async (_req: Request, res: Response) => {
    try {
      const posts = await db.select().from(postsTable); // Fetch all posts
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // POST endpoint: Add a new post to the database
  app.post('/posts', async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    try {
      const newPost = await db
        .insert(postsTable)
        .values({ text }) // Insert a new post
        .returning(); // Return the inserted post
      res.status(201).json(newPost[0]); // Send the first inserted post
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // PUT endpoint: Update a post in the database
  app.put('/posts/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    try {
      const updatedPost = await db
        .update(postsTable)
        .set({ text }) // Update the text field
        .where(eq(postsTable.id, id)) // Where condition matches the ID
        .returning(); // Return the updated post
      if (!updatedPost.length) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(updatedPost[0]); // Send the updated post
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  // DELETE endpoint: Delete a post from the database
  app.delete('/posts/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
      const deletedPost = await db
        .delete(postsTable)
        .where(eq(postsTable.id, id)) // Where condition matches the ID
        .returning(); // Return the deleted post
      if (!deletedPost.length) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(204).send(); // Successfully deleted, no content response
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).send('Internal Server Error');
    }
  });
}
