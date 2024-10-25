import prisma from "../config/database";
import { IUser } from "../interface/user.interface";

export class UserServices {
  async createUser(userData: { name: string; email: string; password: string }) {
    return await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        
      },
    });
  
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: { wishlist: true },
    });
  }
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
        where:{email}
    });
  }
}
