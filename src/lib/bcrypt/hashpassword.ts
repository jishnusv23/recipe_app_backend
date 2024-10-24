import bcrypt from "bcrypt";

export const hashpassword = async (password: string) => {
  try {
    const slat = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, slat);
    if (!hashpassword) {
      throw new Error("Something wrong in Hashpassword");
    }
    return hashpassword;
  } catch (error: any) {
    console.error(`🥅haspassword`);
    throw new Error(error?.message);
  }
};