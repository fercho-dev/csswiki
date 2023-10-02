import Image from "next/image"
import { Resource } from "../types"

export function ResourceCard(
  { url, title, description, image, imageWidth, imageHeight, imageAlt}: Resource) {
  return (
    <a href={url || "/"} target="_blank" title={title as string | undefined}>
      <div className="relative group w-full rounded-md overflow-clip px-2 py-1">
        <Image className="w-full h-full object-cover object-top rounded-md cursor-pointer shadow-sm transition duration-300 hover:scale-105"
          src={image || "/images/placeholder.png"}
          alt={imageAlt || title || "Placeholder"}
          //width={parseInt(imageWidth || '1200') || 1200}
          //height={parseInt(imageHeight || '630') || 630}
          width={240}
          height={126}
          loading="lazy" />
      </div>
    </a>
  )
}