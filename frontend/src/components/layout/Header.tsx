
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              へんしんマジック・キッチン
            </Link>
          </Typography>
          <Link href="/kitchen" passHref>
            <Button color="inherit">キッチン</Button>
          </Link>
          <Link href="/profile" passHref>
            <Button color="inherit">プロフィール</Button>
          </Link>
          <Link href="/login" passHref>
            <Button color="inherit">ログイン</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
