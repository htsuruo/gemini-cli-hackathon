import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <h1>へんしんマジック・キッチン</h1>
      <p>苦手な食べ物を、魔法のレシピで大好きに変えよう！</p>
      <Link href="/login" passHref>
        <Button variant="contained" sx={{ mt: 4 }}>
          はじめる
        </Button>
      </Link>
    </Box>
  );
}