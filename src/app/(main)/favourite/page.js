"use client";
import dynamic from "next/dynamic";
import Background from "../../../Commponents/section-name/Backgorund";

// Client-side only import
const Favourite = dynamic(() => import("../../../Commponents/Favourite/Favourite"), {
  ssr: false,
});

export default function FavouritePage() {
  return (
    <>
      <Background title="Favourite" pageName="Favourite" />
      <Favourite />
    </>
  );
}
