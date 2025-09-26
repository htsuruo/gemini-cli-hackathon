import {
	Button,
	Container,
	Paper,
	PasswordInput,
	Stack,
	TextInput,
	Title,
} from "@mantine/core";

export default function LoginPage() {
	return (
		<Container size="xs" my={40}>
			<Title ta="center">ログイン</Title>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<Stack>
					<TextInput
						label="メールアドレス"
						placeholder="your@email.com"
						required
					/>
					<PasswordInput
						label="パスワード"
						placeholder="Your password"
						required
					/>
					<Button fullWidth mt="xl">
						ログイン
					</Button>
					<Button variant="default" fullWidth>
						Googleでログイン
					</Button>
				</Stack>
			</Paper>
		</Container>
	);
}
