import { addItem, getItems, getItemById, updateItem, deleteItem } from "../services/item.js";

export const itemController = {
  // Controller untuk menambah item baru
  addItem: async (req, res, next) => {
    try {
      const result = await addItem(req.body, req.user.id);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // Controller untuk mendapatkan semua item
  getItems: async (req, res, next) => {
    try {
      const result = await getItems();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // Controller untuk mendapatkan item berdasarkan ID
  getItemById: async (req, res, next) => {
    try {
      const { id } = req.params;  // Ambil ID item dari parameter URL
      const result = await getItemById(parseInt(id));
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // Controller untuk memperbarui item
  updateItem: async (req, res, next) => {
    try {
      const { id } = req.params;  // Ambil ID item dari parameter URL
      const result = await updateItem(parseInt(id), req.body, req.user.id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // Controller untuk menghapus item
  deleteItem: async (req, res, next) => {
    try {
      const { id } = req.params;  // Ambil ID item dari parameter URL
      const result = await deleteItem(parseInt(id));
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
};
