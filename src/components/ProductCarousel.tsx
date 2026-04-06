import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

const ProductCarousel = ({ title, subtitle, products }: ProductCarouselProps) => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 space-y-4 animate-slide-up">
          {subtitle && (
            <p className="text-sm tracking-[0.3em] text-accent uppercase">{subtitle}</p>
          )}
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">{title}</h2>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="group border-none shadow-none bg-transparent overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="bg-accent hover:bg-accent/90 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-light tracking-wide">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <p className="text-lg font-medium text-accent">{product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-12 border-accent text-accent hover:bg-accent hover:text-white" />
          <CarouselNext className="right-0 translate-x-12 border-accent text-accent hover:bg-accent hover:text-white" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
