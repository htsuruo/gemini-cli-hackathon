import { Container, Title, Text, Paper, TextInput, MultiSelect, Button, Stack, Space } from '@mantine/core';

export default function ProfilePage() {
  return (
    <Container size="sm" my={40}>
      <Title order={1} ta="center">
        お子様のプロフィール
      </Title>
      <Text size="lg" color="dimmed" ta="center">
        好き嫌いやアレルギーを登録しましょう。
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack>
          <TextInput label="ニックネーム" placeholder="お子様のニックネーム" required />
          <MultiSelect
            label="アレルギー"
            placeholder="アレルギーのある食材を選択"
            data={['卵', '乳製品', '小麦', 'えび', 'かに', 'そば', '落花生']}
            searchable
          />
          <MultiSelect
            label="苦手な食べ物"
            placeholder="苦手な食べ物を入力"
            data={['ピーマン', 'ナス', 'トマト', 'きのこ', 'にんじん']}
            searchable
          />
          <Space h="md" />
          <Button fullWidth>
            プロフィールを保存
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}