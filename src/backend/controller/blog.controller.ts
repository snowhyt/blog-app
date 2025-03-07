import { Request, Response } from "express";
import pool from "../../db";

// Helper function to get total blog count (for pagination)
const getTotalBlogCount = async (): Promise<number> => {
  const countResult = await pool.query("SELECT COUNT(*) FROM blogs");
  return parseInt(countResult.rows[0].count, 10);
};

// Function to fetch blogs with pagination
const getBlogsWithPagination = async (
  page: number,
  pageSize: number
): Promise<any[]> => {
  const offset = (page - 1) * pageSize;
  const query = `
    SELECT 
      b.id,
      b.title,
      b.description,
      b.image_url,
      b.published_at,
      u.username,
      u.image_url AS author_image_url 
    FROM blogs b
    JOIN users u ON b.author_id = u.id
    ORDER BY b.published_at DESC
    LIMIT $1 OFFSET $2
  `;
  const result = await pool.query(query, [pageSize, offset]);
  return result.rows;
};
// Create a new blog (Admin only)
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description, image_url } = req.body;
    const authorId = req.user.id; // Assuming req.user is set by protectRoute

    if (!title || !description || !image_url) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Forbidden. Only admins can create blogs." });
    }

    const result = await pool.query(
      "INSERT INTO blogs (title, description, image_url, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, image_url, authorId]
    );
    const newBlog = result.rows[0];

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Server Error in Creating Blog" });
  }
};

// Get all blogs with pagination (Public)
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize as string) || 10; // Default to 10 blogs per page

    const totalBlogs = await getTotalBlogCount();
    const blogs = await getBlogsWithPagination(page, pageSize);

    res.status(200).json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / pageSize),
      totalItems: totalBlogs,
    });
  } catch (error) {
    console.error("Error getting blogs:", error);
    res.status(500).json({ message: "Server Error in Getting Blogs" });
  }
};

// Get a single blog by ID (Public)
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const result = await pool.query(
      `
        SELECT 
          b.id,
          b.title,
          b.description,
          b.image_url,
          b.published_at,
          u.username,
          u.image_url AS author_image_url 
        FROM blogs b
        JOIN users u ON b.author_id = u.id
        WHERE b.id = $1
      `,
      [blogId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = result.rows[0];
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error getting blog by ID:", error);
    res.status(500).json({ message: "Server Error in Getting Blog" });
  }
};

// Update a blog (Admin only)
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    const { title, description, image_url } = req.body;

    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Forbidden. Only admins can update blogs." });
    }
    const result = await pool.query(
      "UPDATE blogs SET title = $1, description = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [title, description, image_url, blogId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedBlog = result.rows[0];
    res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Server Error in Updating Blog" });
  }
};

// Delete a blog (Admin only)
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blogId = req.params.id;
    if (req.user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Forbidden. Only admins can delete blogs." });
    }
    const result = await pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [
      blogId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Server Error in Deleting Blog" });
  }
};

