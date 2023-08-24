const express = require("express");
const { BlogModel } = require("../models/BlogModel");
const { auth } = require("../middleware/auth");

const blogRouter = express.Router();
blogRouter.use(auth);

// Get Request
blogRouter.get("/api/blogs", auth, async (req, res) => {
  //    logic
  try {
    const blogs = await BlogModel.find({ userID: req.body.userID });
    res.json({ msg: "Blogs:", blogs });
  } catch (error) {
    res.json({ msg: "Something went wrong while Fetching blogs" });
  }
});

// Get request with query params
blogRouter.get("/api/blogs/filters", auth, async (req, res) => {
  try {
    const { title, category, sort, order } = req.query;

    const query = { userID: req.body.userID };

    if (title) {
      query.title = title;
    }

    if (category) {
      query.category = category;
    }

    const sortoptions = {};
    if (sort === "date") {
      sortoptions.createdAt = order = "asc" ? 1 : -1;
    }

    const blogs = await BlogModel.find(query).sort(sortoptions);
    res.json({ msg: blogs });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong while filtering data" });
  }
});

// Post Request

blogRouter.post("/api/blogs", auth, async (req, res) => {
  try {
    const { title, content, category, userID } = req.body;
    const blog = new BlogModel({
      title,
      content,
      category,
      userID,
    });

    await blog.save();
    res.json({ msg: "Blog has been created Successfully", blog });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Update the post
blogRouter.patch("/api/blogs/:id", auth, async (req, res) => {
  const { id } = req.params;
  const blog = await BlogModel.findOne({ _id: id });

  if (blog) {
    try {
      if ((req.body.userID = blog.userID)) {
        await BlogModel.findByIdAndUpdate({ _id: id }, req.body);
        res.json({ msg: "Blog Updated Successfully"});
      } else {
        res.json({ msg: "something went wrong !!" });
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  }
});

// Delete the post
blogRouter.delete("/api/blogs/:id", async (req, res) => {
    const { id } = req.params;
    const blog = await BlogModel.findOne({ _id: id });
  
    if (blog) {
      try {
        if ((req.body.userID = blog.userID)) {
          await BlogModel.findByIdAndDelete({ _id: id });
          res.json({ msg: "Blog Deleted Successfully"});
        } else {
          res.json({ msg: "something went wrong !!" });
        }
      } catch (error) {
        res.json({ msg: error.message });
      }
    }
});


module.exports = {
  blogRouter,
};
