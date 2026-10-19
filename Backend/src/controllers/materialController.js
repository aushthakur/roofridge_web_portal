const MaterialCategory = require('../models/MaterialCategory');
const MaterialProduct = require('../models/MaterialProduct');
const MaterialOrder = require('../models/MaterialOrder');
const ApiResponse = require('../utils/apiResponse');

// @desc    Get all material categories
// @route   GET /api/v1/materials/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await MaterialCategory.find().sort({ name: 1 });
    return ApiResponse.success(res, categories, 'Categories retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to retrieve categories: ' + error.message, 500);
  }
};

// @desc    Get products with category/brand/search filters
// @route   GET /api/v1/materials/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, brand, search, inStock, sort, page = 1, limit = 20 } = req.query;

    const query = {};

    if (category && category !== 'all') {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        query.categoryName = new RegExp(category, 'i');
      }
    }

    if (brand && brand !== 'all') {
      query.brand = new RegExp(brand, 'i');
    }

    if (inStock === 'true') {
      query.inStock = true;
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [{ name: searchRegex }, { brand: searchRegex }, { categoryName: searchRegex }];
    }

    let sortOption = { isFeatured: -1, createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await MaterialProduct.countDocuments(query);
    const products = await MaterialProduct.find(query)
      .populate('category', 'name slug')
      .populate('supplier', 'businessName rating')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    return ApiResponse.success(res, products, 'Products retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch products: ' + error.message, 500);
  }
};

// @desc    Get single product by ID or Slug
// @route   GET /api/v1/materials/products/:idOrSlug
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let product = null;

    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      product = await MaterialProduct.findById(idOrSlug)
        .populate('category', 'name slug')
        .populate('supplier', 'businessName rating operatingCities');
    } else {
      product = await MaterialProduct.findOne({ slug: idOrSlug.toLowerCase() })
        .populate('category', 'name slug')
        .populate('supplier', 'businessName rating operatingCities');
    }

    if (!product) {
      return ApiResponse.error(res, 'Product not found', 404);
    }

    return ApiResponse.success(res, product, 'Product details retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Error fetching product: ' + error.message, 500);
  }
};

// @desc    Create material order (Checkout)
// @route   POST /api/v1/materials/orders
// @access  Private
exports.createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod = 'online', notes } = req.body;

  if (!items || !items.length) {
    return ApiResponse.error(res, 'Order must contain at least one item', 400);
  }

  try {
    let computedTotal = 0;
    const formattedItems = items.map((item) => {
      const price = Number(item.pricePerUnit || item.unitPrice || item.price || 0);
      const qty = Number(item.quantity || 1);
      const sub = Number(item.subtotal || item.totalPrice || price * qty);
      computedTotal += sub;
      return {
        product: item.productId || item.product,
        name: item.name || 'Building Material',
        quantity: qty,
        pricePerUnit: price,
        subtotal: sub,
        unit: item.unit || 'unit',
      };
    });

    const finalTotal = req.body.totalAmount ? Number(req.body.totalAmount) : computedTotal;

    const order = await MaterialOrder.create({
      user: req.user.id,
      customerName: req.body.customerName || req.user.name,
      customerPhone: req.body.customerPhone || req.user.phone || '',
      items: formattedItems,
      totalAmount: finalTotal,
      shippingAddress: shippingAddress || {},
      paymentMethod,
      status: 'placed',
      notes,
    });

    return ApiResponse.success(res, order, 'Material order placed successfully', 201);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to place order: ' + error.message, 500);
  }
};

// @desc    Get user's material orders
// @route   GET /api/v1/materials/orders/my
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const query = {
      $or: [{ user: req.user.id }],
    };
    if (req.user.phone) {
      query.$or.push({ customerPhone: req.user.phone });
    }
    const orders = await MaterialOrder.find(query).sort({ createdAt: -1 });
    return ApiResponse.success(res, orders, 'Orders retrieved');
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch orders: ' + error.message, 500);
  }
};

// @desc    Get all orders (Admin / Supplier Desk)
// @route   GET /api/v1/materials/orders
// @access  Private (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const total = await MaterialOrder.countDocuments(query);
    const orders = await MaterialOrder.find(query)
      .populate('user', 'name phone email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return ApiResponse.success(res, orders, 'Orders retrieved', 200, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return ApiResponse.error(res, 'Failed to fetch orders: ' + error.message, 500);
  }
};

// @desc    Update Material Order Status (Admin / Logistics Desk)
// @route   PUT /api/v1/materials/orders/:id/status
// @access  Private (Admin)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus, trackingNumber, notes } = req.body;

  try {
    const order = await MaterialOrder.findById(id);
    if (!order) {
      return ApiResponse.error(res, 'Material order not found', 404);
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (notes) order.notes = notes;

    await order.save();
    return ApiResponse.success(res, order, `Order status updated to ${order.status}`);
  } catch (error) {
    return ApiResponse.error(res, 'Failed to update order: ' + error.message, 500);
  }
};

