import { prisma } from "../apps/database.js";
import { HttpException } from "../middleware/error.js";

// Fungsi untuk menambah item baru
export const addItem = async (data, userId) => {
  const { item_code, zahir_code, item_description, unit_name_id, price, image, init_stock } = data;

  // Periksa apakah item dengan kode yang sama sudah ada
  const existingItem = await prisma.item.findUnique({
    where: { item_code },
  });
  if (existingItem) {
    throw new HttpException(400, "Item with the same code already exists");
  }

  // Dapatkan profil pengguna yang membuat item
  const user = await prisma.admin.findUnique({
    where: { id: userId },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new HttpException(404, "User not found");
  }

  // Buat item baru
  const newItem = await prisma.item.create({
    data: {
      item_code,
      zahir_code,
      item_description,
      unit_name_id,
      price,
      image,
      init_stock,
      current_stock: init_stock,  // Current stock dimulai dengan nilai initial stock
      create_by: user.id,
      update_by: user.id,
    },
  });

  return newItem;
};

// Fungsi untuk mendapatkan semua item
export const getItems = async () => {
  const items = await prisma.item.findMany();
  if (!items || items.length === 0) {
    throw new HttpException(404, "No items found");
  }
  return items;
};

// Fungsi untuk mendapatkan item berdasarkan ID
export const getItemById = async (id) => {
  const item = await prisma.item.findUnique({
    where: { id: id },
  });
  if (!item) {
    throw new HttpException(404, "Item not found");
  }
  return item;
};

// Fungsi untuk memperbarui item
export const updateItem = async (id, data, userId) => {
  const { item_code, zahir_code, item_description, unit_name_id, price, image, init_stock } = data;

  // Dapatkan item yang akan diperbarui
  const existingItem = await prisma.item.findUnique({
    where: { id: id },
  });
  if (!existingItem) {
    throw new HttpException(404, "Item not found");
  }

  // Dapatkan profil pengguna yang memperbarui item
  const user = await prisma.admin.findUnique({
    where: { id: userId },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new HttpException(404, "User not found");
  }

  // Perbarui item
  const updatedItem = await prisma.item.update({
    where: { id: id },
    data: {
      item_code,
      zahir_code,
      item_description,
      unit_name_id,
      price,
      image,
      init_stock,
      update_by: user.id,
    },
  });

  return updatedItem;
};

// Fungsi untuk menghapus item
export const deleteItem = async (id) => {
  const existingItem = await prisma.item.findUnique({
    where: { id: id },
  });
  if (!existingItem) {
    throw new HttpException(404, "Item not found");
  }

  await prisma.item.delete({
    where: { id: id },
  });

  return { message: "Item deleted successfully" };
};
