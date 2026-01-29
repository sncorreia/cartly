import {
  AppBar,
  Badge,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../cart/cart";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const { cartCount } = useCart();

  // ✅ Drawer open state
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ Drawer handlers (controlled open/onClose pattern) [1](https://mui.com/material-ui/react-drawer/)
  const openCartDrawer = () => setCartOpen(true);
  const closeCartDrawer = () => setCartOpen(false);

  return (
    <>
      <AppBar sx={{ borderRadius: 0, height: "50px" }} position="static">
        <Container maxWidth="xl" sx={{ backgroundColor: "#01110a" }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                ml: 1,
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MY STORE
            </Typography>
            {/* Cart icon -> opens right drawer */}
            <IconButton
              size="large"
              aria-label="open cart"
              color="inherit"
              onClick={openCartDrawer}
              sx={{
                display: { xs: "none", sm: "flex" },
                mr: 1,
              }}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <CartDrawer open={cartOpen} onClose={closeCartDrawer}></CartDrawer>
    </>
  );
};

export default Navbar;
