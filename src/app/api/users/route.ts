import { connectDB } from "@/app/configs/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { validateJWT } from "@/helpers/validateJWT";
connectDB();

export async function GET(request: NextRequest) {
  try {
    await validateJWT(request);
    const reqBody = await request.json()
    const user = await User.findOne({email: reqBody.email});
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
