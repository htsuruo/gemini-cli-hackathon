"use client";

import { useState } from 'react';
import { Container, Title, Text, TextInput, Button, Loader, Grid, Card, Image, Stack, Space, Group } from '@mantine/core';

// AI提案のモックデータ
const mockPlans = [
  {
    title: "【粉末変身】ピーマンハンバーグ",
    catchphrase: "ピーマンを粉末にしてハンバーグに！栄養だけをこっそり届けよう",
    image: "/next.svg", // 仮の画像
    description: "ピーマンを乾燥させて粉末にし、ハンバーグのつなぎに混ぜます。見た目も味もほとんど分かりません。",
  },
  {
    title: "【甘味変身】ピーマンチャップ",
    catchphrase: "ケチャップ好きのためのピーマンチャップ！甘さで苦味を包み込もう",
    image: "/vercel.svg", // 仮の画像
    description: "お子様の好きなケチャップ味をベースに、甘めの味付けでピーマンの苦味を抑えます。",
  },
  {
    title: "【食感変身】カリカリピーマンチップス",
    catchphrase: "カリカリピーマンチップス！おやつ感覚で食べちゃおう",
    image: "/globe.svg", // 仮の画像
    description: "薄切りにして揚げることで、苦手な食感を『カリカリ』に変身させます。",
  },
];


export default function KitchenPage() {
  const [ingredient, setIngredient] = useState('');
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<typeof mockPlans>([]);

  const handleSearch = () => {
    if (!ingredient) return;
    setLoading(true);
    setPlans([]);
    // AIのモックとしてsetTimeoutを使用
    setTimeout(() => {
      // 入力された食材が「ピーマン」の場合のみモックデータを表示
      if (ingredient.trim() === 'ピーマン') {
        setPlans(mockPlans);
      }
      setLoading(false);
    }, 2000);
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
                        src={plan.image}
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
       {plans.length === 0 && !loading && ingredient.trim() === 'ピーマン' && (
        <Text ta="center" c="dimmed">
            検索ボタンを押してね
        </Text>
      )}
    </Container>
  );
}