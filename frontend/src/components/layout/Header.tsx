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
          <Button color="inherit" component={Link} href="/kitchen">
            キッチン
          </Button>
          <Button color="inherit" component={Link} href="/profile">
            プロフィール
          </Button>
          <Button color="inherit" component={Link} href="/login">
            ログイン
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
