import { useMemo } from "react";
import { useCart } from "../cart/cart";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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

  const cartTotal = useMemo(
    () => cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0),
    [cartItems],
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "90vw", sm: 420 }, p: 2 },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Your Cart
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cartCount} item{cartCount === 1 ? "" : "s"}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      {/* Empty state */}
      {cartItems.length === 0 ? (
        <Box sx={{ py: 4 }}>
          <Typography color="text.secondary">Your cart is empty.</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Add products to see them here.
          </Typography>
        </Box>
      ) : (
        <List sx={{ flexGrow: 1 }}>
          {cartItems.map((item) => (
            <ListItem
              key={item.id}
              disableGutters
              sx={{ py: 1.5, alignItems: "flex-start" }}
              // ✅ Use ListItem secondaryAction prop (recommended over deprecated ListItemSecondaryAction) [3](https://mui.com/material-ui/api/list-item-secondary-action/)
              secondaryAction={
                <IconButton
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItemFromCart(item.id)}
                  edge="end"
                  size="small"
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemAvatar>
                {item.imageUrl ? (
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.imageAltText ?? item.name}
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 1,
                      objectFit: "cover",
                      mr: 1,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 1,
                      bgcolor: "grey.200",
                      mr: 1,
                    }}
                  />
                )}
              </ListItemAvatar>

              <Box sx={{ flex: 1, pr: 5 /* space for delete icon */ }}>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" noWrap title={item.name}>
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      €{item.price.toFixed(2)} each
                    </Typography>
                  }
                  sx={{ my: 0 }}
                />

                {/* Quantity controls + line total */}
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  {/* ButtonGroup groups related buttons (good for +/- UI) [2](https://mui.com/material-ui/react-button-group/) */}
                  <ButtonGroup
                    size="small"
                    variant="outlined"
                    aria-label="quantity controls"
                  >
                    <Button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <Button disabled sx={{ minWidth: 44 }}>
                      {item.quantity}
                    </Button>
                    <Button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </ButtonGroup>

                  <Box sx={{ flexGrow: 1 }} />

                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    €{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      <Divider sx={{ my: 2 }} />
      {/* Footer */}
      <Box sx={{ mt: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            Total
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            €{cartTotal.toFixed(2)}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Close
          </Button>

          <Button
            fullWidth
            variant="contained"
            disabled={cartItems.length === 0}
            onClick={() => {
              // Redirect to your checkout page;
              onClose();
            }}
          >
            Checkout
          </Button>
        </Stack>

        {/* Optional placeholder actions */}
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="text"
            color="inherit"
            disabled={cartItems.length === 0}
            onClick={() => clearCart()}
          >
            Clear cart
          </Button>
          <Button
            fullWidth
            variant="text"
            startIcon={<FavoriteBorderIcon />}
            onClick={() => alert("Wishlist (placeholder)")}
          >
            Wishlist
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
