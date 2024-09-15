"use client";

import GradientBox from "@/components/core/GradientBox";
import { ModelRenderer } from "@/components/core/ModelRenderer";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { toBase64 } from "@/lib/utils";
import { ChangeEvent, useState } from "react";

export default function CapeViewer() {
  const [capeTexture, setCapeTexture] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      toBase64(file)
        .then((base64) => {
          // Make sure base64 is a string before setting it as the cape texture
          if (typeof base64 === "string") {
            setCapeTexture(base64);
          } else {
            console.error("Error: Base64 conversion did not return a string.");
          }
        })
        .catch((error) => {
          console.error("Error converting file to base64:", error);
        });
    } else {
      alert("Please upload a valid PNG or JPG image.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="text-3xl font-bold text-white">Wynntils Cape Viewer</h1>
      <div className="p-6 bg-yellow-300 text-yellow-950 max-w-sm rounded-md">
        <h2 className="text-lg font-bold">READ THIS FIRST</h2>
        <p>This does <b>NOT</b> upload your cape to Wynntils.</p>
      </div>

      <GradientBox>
        <ModelRenderer capeTexture={capeTexture} alternate={false} />
      </GradientBox>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="cape" className="text-white">
          Cape texture
        </Label>
        <Input
          id="cape"
          type="file"
          accept=".jpg, .jpeg, .png"
          aria-describedby="input-description"
          onChange={handleFileChange}
          className="text-white"
        />
        <p id="input-description" className="text-sm text-white">
          Accepted formats: JPEG, PNG
        </p>
      </div>
    </div>
  );
}
