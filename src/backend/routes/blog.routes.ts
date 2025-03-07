import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controller/blog.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

// Create a new blog (Admin only)
router.post("/", protectRoute, createBlog);

// Get all blogs with pagination (Public)
router.get("/", getAllBlogs);

// Get a single blog by ID (Public)
router.get("/:id", getBlogById);

// Update a blog (Admin only)
router.put("/:id", protectRoute, updateBlog);

// Delete a blog (Admin only)
router.delete("/:id", protectRoute, deleteBlog);

export default router;
