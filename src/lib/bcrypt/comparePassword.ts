import bcrypt from "bcrypt";

export const comparepassword = async (
  reqPassword: string,
  storedPassword: string
) => {
  try {
    const match = await bcrypt.compare(reqPassword, storedPassword);
    if (!match) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error("Something wrong in compare password here", error);
    throw new Error(error?.message);
  }
};
