const express = require('express')
const router = express.Router()
const {body,validationResult} = require('express-validator')
const db = require('../db/db')
const authMiddleware = require('../middlewares/auth')


router.post(
    '/',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('The title is required.'),
        body('content').notEmpty().withMessage('The content is required.')
    ],
    async(req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }

        try{
            const {title, content} = req.body
            const user_id = req.userId
            const query = `
                insert into posts (title,content,user_id)
                values ($1, $2, $3)
                return id,title,content,user_id,create_at;
            ` 
            const result = await db.query(query, [title,content,user_id])
            return res.status(201).json(result.rows[0])

        }catch(err){
            console.error("Cannot create post.")
            return res.status(500).json({error:"Server error."})            

        }
    }
)

router.get('/',async (req, res)=>{
    try{
        const result = await db.query('select * from posts order by creat_at desc')
        return res.json(result.rows)
    }catch (err){
        console.error('Cannot find posts.')
        return res.status(500).json({error:"Server error."})
    }

})

router.get('/:id',async (req,res)=>{
    try{
        const result = await db.query('select * from posts where id = $1',[req.params.id])
        if(result.rows.length === 0){
            return res.status(401).json({error:"Cannot find post."})
        }
        return res.json(result.rows[0])
    }catch(err){
        console.error("Cannot find the post:",err)
        res.status(500).json({error:"Server error."})
    }
})

router.put(
    '/:id',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('The title is required.'),
        body('content').notEmpty().withMessage('The content is required.')
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { id } = req.params;
       
        const postResult = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
        if (postResult.rows.length === 0) {
          return res.status(404).json({ error: 'Post not find' });
        }
        const post = postResult.rows[0];
        if (post.user_id !== req.userId) {
          return res.status(403).json({ error: 'You cannot modify this post.' });
        }
        const { title, content } = req.body;

        const updatedTitle = title || post.title;
        const updatedContent = content || post.content;
        const updateQuery = `
          UPDATE posts SET title = $1, content = $2
          WHERE id = $3 RETURNING id, title, content, user_id, created_at
        `;
        const updateResult = await db.query(updateQuery, [updatedTitle, updatedContent, id]);
        return res.json(updateResult.rows[0]);
      } catch (err) {
        console.error('Error updating post:', err);
        return res.status(500).json({ error: 'Server error' });
      }
    }
);

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const { id } = req.params;
      const postResult = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
      if (postResult.rows.length === 0) {
        return res.status(404).json({ error: 'Cannot find this post.' });
      }
      const post = postResult.rows[0];
      if (post.user_id !== req.userId) {
        return res.status(403).json({ error: 'You cannot delete this post.' });
      }
      await db.query('DELETE FROM posts WHERE id = $1', [id]);
      return res.json({ message: 'Post deleted.' });
    } catch (err) {
      console.error('Error deleting post:', err);
      return res.status(500).json({ error: 'Server error.' });
    }
  });
  
  module.exports = router;