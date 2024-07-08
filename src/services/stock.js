import { prisma } from "../apps/database.js";
import { HttpException } from "../middleware/error.js";

// Fungsi untuk mendapatkan stok berdasarkan kategori
export const getStock = async (category) => {
  const stock = await prisma.stockHistory.findMany({
    where: {
      category: parseInt(category)  // Pastikan category dikonversi menjadi integer jika diperlukan
    },
    include: {
      item: true,
      supplier: true,
      unit: true,
      clasification: true
    },
  });
  if (!stock || stock.length === 0) {  // Periksa apakah array kosong
    throw new HttpException(404, "Stock not found");
  }
  return stock;
}

// Fungsi untuk menambah entri stok baru
export const addStock = async (data, userId) => {
  const { item_code_id, qty, category, image_id, clasifications_name_id, supplier_name_id, unit_name_id } = data;

  // Dapatkan current_stock dari item yang relevan
  const item = await prisma.item.findUnique({
    where: { id: item_code_id },
  });
  if (!item) {
    throw new HttpException(404, "Item not found");
  }

  // Simpan nilai current_stock sebagai current_stock_id dalam StockHistory
  const currentStockId = item.current_stock;

  // Update current_stock sesuai dengan operasi yang dilakukan
  let newStock = item.current_stock;
  if (category === 1) {
    // Barang masuk
    newStock += qty;
  } else if (category === 2) {
    // Barang keluar
    newStock -= qty;
  } else {
    throw new HttpException(400, "Invalid category");
  }

    // Dapatkan profil pengguna yang membuat atau memperbarui
    const user = await prisma.admin.findUnique({
      where: { id: userId },
      select: {
        id: true,
      },
    });
    if (!user) {
      throw new HttpException(404, "User not found");
    }

  // Buat entri baru dalam StockHistory
  const stockHistory = await prisma.stockHistory.create({
    data: {
      item_code_id,
      qty,
      category,
      image_id,
      create_by_id: user.id,
      update_by_id: user.id,
      clasifications_name_id,
      supplier_name_id,
      unit_name_id,
      current_stock_id: currentStockId,
    },
  });

  // Perbarui current_stock dari item
  await prisma.item.update({
    where: { id: item_code_id },
    data: { current_stock: newStock },
  });

  return stockHistory;
}

// Fungsi untuk memperbarui entri stok yang ada
export const updateStock = async (id_history, data, userId) => {
  const { item_code_id, qty, category, image_id, clasifications_name_id, supplier_name_id, unit_name_id } = data;

  // Dapatkan entri stok yang ada
  const existingStock = await prisma.stockHistory.findUnique({
    where: { id_history: parseInt(id_history) },
  });
  if (!existingStock) {
    throw new HttpException(404, "Stock entry not found");
  }

  // Dapatkan current_stock dari item yang relevan
  const item = await prisma.item.findUnique({
    where: { id: item_code_id },
  });
  if (!item) {
    throw new HttpException(404, "Item not found");
  }

   // Validasi foreign key
   const clasificationExists = await prisma.clasification.findUnique({
    where: { id: clasifications_name_id },
  });
  if (!clasificationExists) {
    throw new HttpException(400, "Clasification not found");
  }

  const supplierExists = await prisma.supplier.findUnique({
    where: { id: supplier_name_id },
  });
  if (!supplierExists) {
    throw new HttpException(400, "Supplier not found");
  }

  const unitExists = await prisma.unit.findUnique({
    where: { id: unit_name_id },
  });
  if (!unitExists) {
    throw new HttpException(400, "Unit not found");
  }

  // Update current_stock sesuai dengan operasi yang dilakukan
  let newStock = item.current_stock;
  if (category === 1) {
    // Barang masuk
    newStock += qty - existingStock.qty;
  } else if (category === 2) {
    // Barang keluar
    newStock -= qty - existingStock.qty;
  } else {
    throw new HttpException(400, "Invalid category");
  }

  // Dapatkan profil pengguna yang memperbarui
  const user = await prisma.admin.findUnique({
    where: { id: userId },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new HttpException(404, "User not found");
  }

  // Perbarui entri dalam StockHistory
  const updatedStock = await prisma.stockHistory.update({
    where: { id_history },
    data: {
      item_code_id,
      qty,
      category,
      image_id,
      update_by_id: user.id,
      clasifications_name_id,
      supplier_name_id,
      unit_name_id,
      current_stock_id: newStock,
    },
  });

  // Perbarui current_stock dari item
  await prisma.item.update({
    where: { id: item_code_id },
    data: { current_stock: newStock },
  });

  return updatedStock;
}

// Fungsi untuk menghapus entri stok
export const deleteStock = async (id_history, userId) => {
  if (!id_history) {
    throw new HttpException(400, "id_history is required");
  }

  // Dapatkan entri stok yang ada
  const existingStock = await prisma.stockHistory.findUnique({
    where: { id_history: parseInt(id_history) },
  });
  if (!existingStock) {
    throw new HttpException(404, "Stock entry not found");
  }

  // Dapatkan item yang relevan
  const item = await prisma.item.findUnique({
    where: { id: existingStock.item_code_id },
  });
  if (!item) {
    throw new HttpException(404, "Item not found");
  }

  // Update current_stock sesuai dengan operasi yang dilakukan
  let newStock = item.current_stock;
  if (existingStock.category === 1) {
    // Barang masuk
    newStock -= existingStock.qty;
  } else if (existingStock.category === 2) {
    // Barang keluar
    newStock += existingStock.qty;
  } else {
    throw new HttpException(400, "Invalid category");
  }

  // Hapus entri dalam StockHistory
  await prisma.stockHistory.delete({
    where: { id_history: parseInt(id_history) },
  });

  // Perbarui current_stock dari item
  await prisma.item.update({
    where: { id: existingStock.item_code_id },
    data: { current_stock: newStock },
  });

  return { message: "Stock entry deleted successfully" };
}