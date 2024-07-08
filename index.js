const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/item', async (req, res) => {
  const {
    item_code,
    item_description,
    zahir_code,
    price,
    image,
    init_stock,
    current_stock,
    create_by,
    update_by
  } = req.body;

  try {
    const newItem = await prisma.item.create({
      data: {
        item_code,
        item_description,
        zahir_code,
        price,
        image,
        init_stock,
        current_stock,
        create_by,
        update_by
      }
    });
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk mendapatkan semua data produksi
app.get('/produksi', async (req, res) => {
  const produksis = await prisma.produksi.findMany({
    include: {
      item: true,
      supplier: true,
      unit: true,
      clasification: true
    }
  });
  res.json(produksis);
});

// Route untuk menambah data produksi
app.post('/produksi', async (req, res) => {
  const {
    item_code_id,
    zahir_code_id,
    item_description_id,
    price_id,
    unit_name_id,
    supplier_name_id,
    clasifications_name_id,
    init_stock_id,
    current_stock_id
  } = req.body;

  try {
    const produksi = await prisma.produksi.create({
      data: {
        item_code_id,
        zahir_code_id,
        item_description_id,
        price_id,
        unit_name_id,
        supplier_name_id,
        clasifications_name_id,
        init_stock_id,
        current_stock_id
      }
    });
    res.json(produksi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/stock_history', async (req, res) => {
  const { item_code_id, qty, category, image_id, create_by_id, update_by_id, clasifications_name_id, supplier_name_id, unit_name_id } = req.body;

  try {
    // Dapatkan current_stock dari item yang relevan
    const item = await prisma.item.findUnique({
      where: { id: item_code_id },
    });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
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
      return res.status(400).json({ error: 'Invalid category' });
    }

    // Buat entri baru dalam StockHistory
    const stockHistory = await prisma.stockHistory.create({
      data: {
        item_code_id,
        qty,
        category,
        image_id,
        create_by_id,
        update_by_id,
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

    res.json(stockHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk mendapatkan riwayat stok
app.get('/stock_history', async (req, res) => {
  const { category } = req.query; // Dapatkan query parameter 'category'
  try {
    const where = category ? { category: parseInt(category) } : {};
    const stockHistories = await prisma.stockHistory.findMany({
      where,
      include: {
        item: true,
        supplier: true,
        unit: true,
        clasification: true
        // Tambahkan relasi yang valid jika ada, misalnya:
        // create_by: true,
        // update_by: true
      },
    });
    res.json(stockHistories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

