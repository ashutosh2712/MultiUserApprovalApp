import jwt from "jsonwebtoken";
import { Users } from "../schemas/Users.mjs";

const jwtSecret =
  "20741f1747b01f13a45dfcac48dcf33a96d242a8a365b0edc20c92d3a4936c21";

const authenticatedUser = async (request, response, next) => {
  const token = request.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return response
      .status(401)
      .json({ message: "No Token Provided.Unauthorized!" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    request.user = decoded;

    const user = await Users.findById(request.user.userId);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    request.user = user;

    next();
  } catch (error) {
    response.status(500).json({ message: "Invalid Token" });
  }
};

export default authenticatedUser;
