import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import adminRoutes from "./routes/admin.routes";
import uploadRoutes from "./routes/upload.routes";
import inquiryRoutes from "./routes/inquiry.routes";
import categoryRoutes from "./routes/category.routes";
import customerRoutes from "./routes/customer.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import favoriteRoutes from "./routes/favorite.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/uploads", express.static("uploads", {
    setHeaders: (res, path) => {
        res.set("Access-Control-Allow-Origin", "*");
        res.set("Cross-Origin-Resource-Policy", "cross-origin");
    }
}));
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (_req, res) => {
  res.send("Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});