import { Box, Grid } from "@mui/material";
import { useCart } from "../cart/cart";
import ItemCard from "./ItemCard";

// In real life applications, this data should be fetched from an API
const PLACEHOLDER_DATA = [
  {
    id: "card-001",
    name: "Pikachu – Electric Spark",
    price: 9.99,
    quantity: 1,
    shortDescription:
      "A classic Electric-type Pokémon card with a bright holo finish.",
    imageUrl:
      "https://tcghobby.com/cdn/shop/files/surging_spark_booster_box_traditional_chinese.jpg?v=1729414954",
    imageAltText: "Pikachu trading card",
  },
  {
    id: "card-002",
    name: "Charizard – Flame Burst",
    price: 29.99,
    quantity: 1,
    shortDescription:
      "Powerful Fire-type card featuring Charizard in a dynamic pose.",
    imageUrl:
      "https://glit-hobby.com/cdn/shop/files/134_exSAR.png?v=1692409054",
    imageAltText: "Charizard trading card",
  },
  {
    id: "card-003",
    name: "Blue-Eyes White Dragon",
    price: 19.5,
    quantity: 1,
    shortDescription:
      "Legendary dragon card with high attack and iconic artwork.",
    imageUrl:
      "https://www.duelshop.com.br/12017-thickbox_default/blue-eyes-white-dragon-lckc-en001-earth-background-ultra-rare.jpg",
    imageAltText: "Blue-Eyes White Dragon card",
  },
  {
    id: "card-004",
    name: "Red Eyes Black Dragon",
    price: 15.99,
    quantity: 1,
    shortDescription:
      "Legendary Joey's Red-Eyes Black Dragon card with iconic artwork.",
    imageUrl:
      "https://yumeinihon.com/cdn/shop/files/711D-JP003_PNG_500x500_Yumei.png?v=1725237250",
    imageAltText: "Red-Eyes Black Dragon card",
  },
];

const ItemList = () => {
  const { addItemToCart } = useCart();

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      <Grid container spacing={3}>
        {PLACEHOLDER_DATA.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id}>
            <ItemCard cartItem={item} addItemToCart={addItemToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemList;
