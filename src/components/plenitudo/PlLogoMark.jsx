import Image from "next/image";

export default function PlLogoMark({ showText = false, size = "md", className = "" }) {
  const sizes = {
    sm: { image: "w-12 h-12 sm:w-28 sm:h-28 md:w-32 md:h-32", text: "text-sm" },
    md: { image: "w-16 h-16 sm:w-32 sm:h-32 md:w-40 md:h-40", text: "text-base" },
    lg: { image: "w-20 h-20 sm:w-36 sm:h-36 md:w-48 md:h-48", text: "text-lg" },
  };

  const sizeClasses = sizes[size] || sizes.md;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {/* Logo Image with transparent background to blend with site */}
      <div className={`relative ${sizeClasses.image} bg-transparent`}>
        <Image
          src="/PlenitudoWebLogoTransparent.png"
          alt="Plenitudo AI"
          width={192}
          height={192}
          className="w-full h-full object-contain"
          priority
          unoptimized={false}
        />
      </div>

      {/* Text below logo (if showText is true) */}
      {showText && (
        <span className={`${sizeClasses.text} font-semibold tracking-wide text-emerald-400 uppercase`}>
          PLENITUDO AI
        </span>
      )}
    </div>
  );
}
