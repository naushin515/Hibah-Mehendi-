export const validateRegisterInput = (req, res, next) => {
  const { name, email, password, mobile } = req.body;
  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: 'Please provide name, email, password, and mobile number' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }
  next();
};

export const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }
  next();
};

export const validateOrderInput = (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }
  if (!shippingAddress || !shippingAddress.name || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode || !shippingAddress.mobile || !shippingAddress.email) {
    return res.status(400).json({ message: 'Please provide a complete shipping address' });
  }
  if (!paymentMethod) {
    return res.status(400).json({ message: 'Please specify payment method' });
  }
  next();
};
