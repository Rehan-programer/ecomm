import { connectDB } from "../../../../lib/db";
import Favourite from "../../../models/Favourite";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const favourites = await Favourite.find({
      userId: params.userId,
    }).populate("productId");
    return new Response(JSON.stringify(favourites), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
