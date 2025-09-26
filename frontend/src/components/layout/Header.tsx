import { Box, Button, Container, Group, Title } from "@mantine/core";
import Link from "next/link";

export default function Header() {
	const headerStyle: React.CSSProperties = {
		height: 60,
		paddingLeft: "var(--mantine-spacing-md)",
		paddingRight: "var(--mantine-spacing-md)",
		borderBottom: "1px solid #e9ecef", // Hardcoded light gray
	};

	const innerStyle: React.CSSProperties = {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	};

	const titleStyle: React.CSSProperties = {
		textDecoration: "none",
		color: "inherit",
	};

	return (
		<Box component="header" style={headerStyle}>
			<Container fluid style={innerStyle}>
				<Link href="/" style={titleStyle}>
					<Title order={3}>へんしんマジック・キッチン</Title>
				</Link>
				<Group>
					<Button variant="default" component={Link} href="/kitchen">
						キッチン
					</Button>
					<Button variant="default" component={Link} href="/profile">
						プロフィール
					</Button>
					<Button component={Link} href="/login">
						ログイン
					</Button>
				</Group>
			</Container>
		</Box>
	);
}
