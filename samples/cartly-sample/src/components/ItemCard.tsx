import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import type { CartItem } from "../types/types";

type ItemCardProps = {
  cartItem: CartItem;
  addItemToCart: (cartItem: CartItem, quantity: number) => void;
};

const ItemCard = ({ cartItem, addItemToCart }: ItemCardProps) => {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow .2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      {/* Media on top with consistent aspect ratio */}

      <CardMedia
        component="img"
        height="300"
        image={cartItem.imageUrl}
        alt={cartItem.imageAltText}
      />

      {/* Content in the middle, grows vertically */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap title={cartItem.name}>
          {cartItem.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          title={cartItem.shortDescription}
        >
          {cartItem.shortDescription}
        </Typography>

        {typeof cartItem.price === "number" && (
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
            €{cartItem.price.toFixed(2)}
          </Typography>
        )}
      </CardContent>

      {/* Actions pinned at bottom — placeholders only */}
      <CardActions
        sx={{
          p: 2,
          pt: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wishlist (placeholder) */}
        <IconButton
          aria-label="Add to wishlist"
          // placeholder only; implement later
          onClick={() => {}}
        >
          <FavoriteBorderIcon />
        </IconButton>

        {/* Add to Cart (placeholder) */}
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          aria-label={`Add ${name} to cart`}
          // placeholder only; implement later
          onClick={() => {
            addItemToCart(cartItem, 1);
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ItemCard;
