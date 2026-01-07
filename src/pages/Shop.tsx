import { useState, useEffect, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/products/ProductCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PRODUCTS, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [view, setView] = useState<"grid" | "large">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [petFilter, setPetFilter] = useState<string>("all");

  // Filter products by search query
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return PRODUCTS;
    
    const query = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.shortDescription?.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);
      const featuresMatch = product.features.some((feature) =>
        feature.toLowerCase().includes(query)
      );
      return nameMatch || descMatch || categoryMatch || featuresMatch;
    });
  }, [searchQuery]);

  // Filter products by category
  const filteredProducts = category
    ? searchFilteredProducts.filter((p) => p.category === category)
    : searchFilteredProducts;

  // Filter by pet type
  const finalProducts = petFilter === "all"
    ? filteredProducts
    : filteredProducts.filter((p) => (p.petType as readonly string[]).includes(petFilter));

  // Sort products
  const sortedProducts = [...finalProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const currentCategory = CATEGORIES.find((c) => c.id === category);

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/shop" className={cn(
              "transition-colors",
              !category ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            )}>
              Shop
            </Link>
            {currentCategory && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="text-foreground font-medium">{currentCategory.name}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/shop"
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors",
                        !category
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      All Products
                    </Link>
                  </li>
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={cat.href}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-sm transition-colors",
                          category === cat.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-secondary"
                        )}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pet Type Filter */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-4">Pet Type</h3>
                <div className="space-y-2">
                  {["all", "dog", "cat"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPetFilter(type)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors capitalize",
                        petFilter === type
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )}
                    >
                      {type === "all" ? "All Pets" : type === "dog" ? "Dogs" : "Cats"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <AnimatedSection className="mb-8">
              {searchQuery ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold">
                      Search Results
                    </h1>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        searchParams.delete("search");
                        setSearchParams(searchParams);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                    <p>
                      Found <span className="font-semibold text-foreground">{sortedProducts.length}</span> products for "
                      <span className="font-semibold text-primary">{searchQuery}</span>"
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {currentCategory?.name || "All Products"}
                  </h1>
                  <p className="text-muted-foreground">
                    {currentCategory?.description || "Browse our complete collection of smart pet products"}
                  </p>
                </>
              )}
            </AnimatedSection>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card rounded-xl border border-border">
              <span className="text-sm text-muted-foreground">
                {sortedProducts.length} products
              </span>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setView("grid")}
                    className={cn(
                      "p-2 transition-colors",
                      view === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setView("large")}
                    className={cn(
                      "p-2 transition-colors",
                      view === "large" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={cn(
              "grid gap-6",
              view === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            )}>
              {sortedProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 50}>
                  <ProductCard
                    {...product}
                    image={product.image}
                    hoverImage={product.hoverImage}
                  />
                </AnimatedSection>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found</p>
                <Button asChild>
                  <Link to="/shop">View All Products</Link>
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
