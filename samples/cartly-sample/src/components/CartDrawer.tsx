import Drawer from "@mui/material/Drawer";
import { useCart } from "../cart/cart";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const {
    cartItems,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    cartCount,
  } = useCart();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      Test
    </Drawer>
  );
};

export default CartDrawer;
