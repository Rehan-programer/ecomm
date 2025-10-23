import { connectDB } from "../../../lib/db";
import Favourite from "../../models/Favourite";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({ message: "Missing userId" }),
        { status: 400 }
      );
    }

    // ✅ Find favourites and populate productId
    const favourites = await Favourite.find({ userId }).populate("productId");

    // Map to return only the populated product objects
    const products = favourites.map((fav) => fav.productId);

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { userId, productId } = await req.json();

    if (!userId || !productId) {
      return new Response(
        JSON.stringify({ message: "Missing userId or productId" }),
        { status: 400 }
      );
    }

    const exists = await Favourite.findOne({ userId, productId });

    if (exists) {
      await Favourite.findOneAndDelete({ userId, productId });
      return new Response(
        JSON.stringify({ message: "Removed from favourites" }),
        { status: 200 }
      );
    }

    const fav = await Favourite.create({ userId, productId });

    // Populate productId before returning
    await fav.populate("productId");

    return new Response(JSON.stringify(fav.productId), { status: 201 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}
