const authorize = (...roles) => {
  return (req, res, next) => {



    console.log("Allowed Roles:", roles);
    console.log("Decoded User:", req.user);
    console.log("User Role:", req.user.role);






    if (
      !roles.includes(req.user.role)
    ) {
      return res.status(403).json({
        message: "Access Denied"
      });
    }

    next();
  };
};

export default authorize;