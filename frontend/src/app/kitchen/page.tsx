"use client";

import { useState } from 'react';
import { Container, Title, Text, TextInput, Button, Loader, Grid, Card, Image, Stack, Space, Group, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

// AIが生成するプランの型定義
interface Plan {
  title: string;
  catchphrase: string;
  description: string;
  image?: string; // 画像はオプショナルに
}

export default function KitchenPage() {
  const [ingredient, setIngredient] = useState('');
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 本来はプロフィールページから受け取るが、今回はハードコード
  const likes = ['ハンバーグ', 'カリカリ', 'あまい', 'ケチャップ味'];
  const dislikes = ['きのこ', 'ぐにゃぐにゃ', 'にがい'];

  const handleSearch = async () => {
    if (!ingredient) return;
    setLoading(true);
    setPlans([]);
    setError(null);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredient, likes, dislikes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'プランの生成に失敗しました。');
      }

      const data = await response.json();
      // 各プランに静的なプレースホルダー画像を追加
      const plansWithImages = data.plans.map((plan: Plan, index: number) => ({
        ...plan,
        image: [`/next.svg`, `/vercel.svg`, `/globe.svg`][index % 3],
      }));
      setPlans(plansWithImages);

    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('予期せぬエラーが発生しました。');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container my={40}>
      <Title order={1} ta="center">
        へんしんマジック・キッチン
      </Title>
      <Text size="lg" color="dimmed" ta="center" mt="md">
        今日は何に挑戦する？
      </Text>

      <Group justify="center" mt="xl">
        <TextInput
          value={ingredient}
          onChange={(event) => setIngredient(event.currentTarget.value)}
          placeholder="苦手な食材を入力 (例: ピーマン)"
          style={{ width: 300 }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch} disabled={loading}>
          マジカル調理法を検索
        </Button>
      </Group>

      <Space h="xl" />

      {loading && (
        <Stack align="center">
          <Loader />
          <Text>マジカル調理法を検索中...</Text>
        </Stack>
      )}

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="エラー" color="red" radius="md">
          {error}
        </Alert>
      )}

      {plans.length > 0 && (
         <Stack>
            <Title order={2} ta="center">
              「{ingredient}」の変身プランはこちら！
            </Title>
            <Grid mt="md">
              {plans.map((plan, index) => (
                <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Image
                        src={plan.image || '/file.svg'} // フォールバック画像
                        height={160}
                        alt={plan.title}
                      />
                    </Card.Section>

                    <Stack mt="md" mb="xs">
                       <Title order={4}>{plan.title}</Title>
                       <Text size="sm" c="dimmed">{plan.catchphrase}</Text>
                    </Stack>

                    <Text size="sm">
                      {plan.description}
                    </Text>

                    <Button color="blue" fullWidth mt="md" radius="md">
                      このレシピを見る
                    </Button>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
        </Stack>
      )}
    </Container>
  );
}