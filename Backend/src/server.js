const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const ApiResponse = require('./utils/apiResponse');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB().catch((err) => {
  console.error('[Server Startup Fatal] Database connection error:', err.message);
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

const app = express();

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// Health Check Endpoint
app.get(['/health', '/api/health', '/api/v1/health'], (req, res) => {
  const dbState = mongoose.connection.readyState;
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const isDbConnected = dbState === 1;
  const dbStatus = dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';
  const isEphemeral = connectDB.isEphemeralDatabase ? connectDB.isEphemeralDatabase() : false;

  const healthData = {
    status: isDbConnected ? 'healthy' : 'degraded',
    database: {
      status: dbStatus,
      isEphemeral,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
    },
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Roof Ridge API Engine',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  };

  if (!isDbConnected) {
    return res.status(503).json({
      success: false,
      data: healthData,
      message: 'Database connection is degraded or disconnected',
    });
  }

  return ApiResponse.success(res, healthData, 'Roof Ridge API is active and operational');
});

// Import Routers
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const leadRoutes = require('./routes/leadRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const materialRoutes = require('./routes/materialRoutes');
const financeRoutes = require('./routes/financeRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cmsRoutes = require('./routes/cmsRoutes');

// Mount Routers (Supporting /api/v1/*, legacy /api/*, and direct /* paths)
const routes = [
  { path: 'auth', router: authRoutes },
  { path: 'properties', router: propertyRoutes },
  { path: 'leads', router: leadRoutes },
  { path: 'admin/leads', router: leadRoutes },
  { path: 'admin/crm/leads', router: leadRoutes },
  { path: 'bookings', router: bookingRoutes },
  { path: 'materials', router: materialRoutes },
  { path: 'finance', router: financeRoutes },
  { path: 'partners', router: partnerRoutes },
  { path: 'admin', router: adminRoutes },
  { path: 'notifications', router: notificationRoutes },
  { path: 'cms', router: cmsRoutes },
];

routes.forEach(({ path, router }) => {
  app.use(`/api/v1/${path}`, router);
  app.use(`/api/${path}`, router);
  app.use(`/${path}`, router);
});

// 404 Route Handler
app.use((req, res, next) => {
  return ApiResponse.error(res, `Endpoint not found: ${req.method} ${req.originalUrl}`, 404);
});

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Roof Ridge Backend] Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

module.exports = app;
