import { prisma } from "../apps/database.js";
import { HttpException } from "../middleware/error.js";

export const getProfile = async (userId) => {
  console.log(userId)
  const user = await prisma.admin.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      created_at: true,
    },
  });
  if (!user) {
    throw new HttpException(404, "User not found");
  }
  return user;
};
