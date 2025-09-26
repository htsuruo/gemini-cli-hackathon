"use client";

import {
	Button,
	Container,
	MultiSelect,
	NumberInput,
	Paper,
	Space,
	Stack,
	TextInput,
	Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
	const router = useRouter();

	const handleRegister = () => {
		// TODO: Save profile data
		router.push("/kitchen");
	};

	return (
		<Container size="sm" my={40}>
			<Title order={1} ta="center">
				こんにちは！まずはお子様のことを教えてください
			</Title>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<Stack>
					<TextInput label="名前" placeholder="お子様の名前" required />
					<NumberInput
						label="年齢"
						placeholder="お子様の年齢"
						required
						min={0}
						max={18}
					/>
					<MultiSelect
						label="好きな食べ物・食感"
						placeholder="好きなものを教えてください"
						data={[
							"ハンバーグ",
							"カリカリ",
							"あまい",
							"ケチャップ味",
							"からあげ",
							"ポテト",
							"くだもの",
						]}
						searchable
					/>
					<MultiSelect
						label="苦手な食べ物・食感"
						placeholder="苦手なものを教えてください"
						data={[
							"ピーマン",
							"きのこ",
							"ぐにゃぐにゃ",
							"にがい",
							"なす",
							"トマト",
							"ブロッコリー",
						]}
						searchable
					/>
					<Space h="md" />
					<Button fullWidth onClick={handleRegister}>
						登録する
					</Button>
				</Stack>
			</Paper>
		</Container>
	);
}
