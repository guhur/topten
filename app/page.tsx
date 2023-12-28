"use client";
import Image from "next/image";
import { useState } from "react";
import DrawCards from "../components/DrawCards";
import GenerateSentence from "../components/GenerateSentence";

export default function Home() {
  return (
    <>
      <DrawCards numCards={4} />
      <GenerateSentence />
    </>
  );
}
