import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useCart } from "@/hooks/useCart";
import { BUSINESS_INFO } from "@/lib/constants";

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-16 md:py-24 text-center">
          <AnimatedSection>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-surface flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items yet
            </p>
            <Button asChild size="lg">
              <Link to="/shop">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </Layout>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <AnimatedSection>
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <AnimatedSection
                key={item.id}
                delay={index * 50}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.id}`}
                    className="font-semibold hover:text-primary transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-lg font-bold text-primary mt-1">
                    ${item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <AnimatedSection delay={200}>
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                )}
                <div className="pt-3 border-t border-border flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button size="lg" className="w-full mb-4">
                Proceed to Checkout
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure checkout powered by industry-standard encryption
              </p>

              <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
                <p className="font-medium text-foreground">{BUSINESS_INFO.name}</p>
                <p>{BUSINESS_INFO.email}</p>
                <p>{BUSINESS_INFO.phone}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
