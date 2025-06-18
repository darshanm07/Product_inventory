const User = require("../models/user.model");
const { verifyToken } = require("./authToken");

const isAuthenticate = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    res.message = _localize("response_message.unAuthenticated", req);
    return utils.unAuthenticated(res);
  }
  try {
    const decoded = verifyToken(token);

    const user = await User.findOne({ email: decoded?.email });

    if (!user) {
      res.message = _localize("response_message.unAuthenticated", req);
      return utils.unAuthenticated(res);
    }

    req.user = user;

    // if (req.method === "POST" && req.originalUrl.includes("/create")) {
    //   req.body.createdBy = user._id;
    // }

    // if (req.method === "PUT") {
    //   req.body.updatedBy = user._id || "";
    // }

    next();
  } catch (error) {
    res.message = _localize("response_message.unAuthenticated", req);
    return utils.unAuthenticated(res);
  }
};
module.exports = {
  isAuthenticate,
};
