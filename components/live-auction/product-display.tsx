'use client'

interface ProductDisplayProps {
  image: string
  title: string
}

export function ProductDisplay({ image, title }: ProductDisplayProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="relative bg-muted h-96 md:h-full flex items-center justify-center">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
