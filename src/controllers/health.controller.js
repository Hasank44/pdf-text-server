export const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: "PDF Extraction API is running",
    timestamp: new Date().toISOString(),
  });
};
