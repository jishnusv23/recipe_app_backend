// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default prisma;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: ["query"],
});

export default prisma;