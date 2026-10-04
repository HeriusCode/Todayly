export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Không tìm thấy endpoint: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Lỗi máy chủ',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
