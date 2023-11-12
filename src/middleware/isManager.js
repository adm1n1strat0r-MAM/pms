import createError from "../utils/createError.js";

export const isManager = (req, res, next) => {
  // Assuming user roles are stored in the user object (e.g., req.user.role)
  if (req.isAdmin || req.userType == "Manager") {
    next(); // User has admin role, proceed to the next middleware
  } else {
    next(createError(403, "Access forbidden. Requires admin privileges."));
  }
};
