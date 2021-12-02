const userModel = require("./user_model");
const responseHandler = require("../../util/response_handler");
const { APIError } = require("../../util/error_handler");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    return responseHandler(res, 200, "all users", {
      users,
    });
  } catch (err) {
    return next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const userData = ({ firstName, lastName, password, registrationNumber } =
      req.body);

    const user = new userModel(userData);
    await user.save();
    return responseHandler(res, 201, "Created user", { user });
  } catch (err) {
    return next(err);
  }
};

exports.authUser = async (req, res, next) => {
  try {
    const { registrationNumber, password } = req.body;

    const user = await userModel.findOne({
      registrationNumber,
    });

    if (!user) {
      throw new APIError(404, "User not found");
    }

    const compareResult = await user.comparePassword(password);

    if (!compareResult) {
      throw new APIError("403", "Invalid password");
    }

    const { accessToken } = await user.generateToken();
    res.set("x-auth", accessToken);
    return responseHandler(res, 200, "authentication successful", {
      user,
      token: accessToken,
    });
  } catch (err) {
    return next(err);
  }
};
