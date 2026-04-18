function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).send('<h2>403 - Access Denied</h2>');
    next();
  };
}
module.exports = requireRole;
