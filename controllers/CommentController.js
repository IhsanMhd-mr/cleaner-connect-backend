const commentService = require('../services/CommentService.js');

exports.createComment = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: "data is missing in the request body", status:false });
  }
  const { task_id, user_id, description } = req.body;
  try {
    const result = await commentService.createComment(task_id, user_id, description);

    if(result.status){
      res.status(200).json({message :result.message, status:true});
    }else{
      res.status(400).json({message :result.message, status:false});
    }  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" , status:false});
  }
};