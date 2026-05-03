import { connectDB } from "@/lib/mongodb";
import Ram from "@/models/Ram";

export async function GET() {
  try {
    await connectDB();
    const rams = await Ram.find();
    return Response.json(rams);
  } catch (e) {
    return Response.json([], { status: 200 });
  }
}