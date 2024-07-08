import { getStock, addStock, updateStock, deleteStock } from "../services/stock.js";

export const stockController = {
  // Controller untuk mendapatkan stok berdasarkan kategori
  getStock: async (req, res, next) => {
    try {
      const category = req.query.category;  // Ambil category dari query parameters
      if (!category) {
        throw new HttpException(400, "Category is required");
      }
      const result = await getStock(category);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // Controller untuk menambah entri stok baru
  addStock: async (req, res, next) => {
    try {
      const result = await addStock(req.body, req.user.id);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

    // Controller untuk memperbarui entri stok yang ada
    updateStock: async (req, res, next) => {
      try {
        const userId = req.user.id;  // Ambil ID pengguna dari req.user
        const { id_history } = req.params;  // Ambil ID stok dari parameter URL
        const result = await updateStock(parseInt(id_history), req.body, userId);
        return res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    },

    deleteStock: async (req, res, next) => {
      try {
        const userId = req.user.id;
        const { id_history } = req.params; // Mengambil id_history dari URL parameter
        const result = await deleteStock(id_history, userId);
        return res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    }
};
