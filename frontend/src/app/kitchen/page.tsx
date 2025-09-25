"use client";

import { useState } from 'react';
import { Container, Title, Text, TextInput, Button, Loader, Grid, Card, Image, Stack, Space, Group, Alert, Skeleton } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

// AIが生成するプランの型定義
interface Plan {
  title: string;
  catchphrase: string;
  description: string;
  image?: string;
  imageLoading?: boolean;
}

export default function KitchenPage() {
  const [ingredient, setIngredient] = useState('');
  const [textLoading, setTextLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 本来はプロフィールページから受け取るが、今回はハードコード
  const likes = ['ハンバーグ', 'カリカリ', 'あまい', 'ケチャップ味'];
  const dislikes = ['きのこ', 'ぐにゃぐにゃ', 'にがい'];

  const handleSearch = async () => {
    if (!ingredient) return;
    setTextLoading(true);
    setPlans([]);
    setError(null);

    try {
      // 1. テキストプランを生成
      const textResponse = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient, likes, dislikes }),
      });

      if (!textResponse.ok) {
        const errorData = await textResponse.json();
        throw new Error(errorData.details || 'プランの生成に失敗しました。');
      }

      const textData = await textResponse.json();
      const initialPlans = textData.plans.map((plan: Omit<Plan, 'imageLoading' | 'image'>) => ({
        ...plan,
        image: undefined,
        imageLoading: true,
      }));
      setPlans(initialPlans);
      setTextLoading(false);

      // 2. 各プランの画像を並列で生成
      initialPlans.forEach(async (plan: Plan, index: number) => {
        try {
          const imageResponse = await fetch('/api/generate-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: plan.title, description: plan.description }),
          });

          if (!imageResponse.ok) {
            // 画像生成に失敗してもエラーメッセージは出さず、画像なしで続行
            console.error(`Failed to generate image for: ${plan.title}`);
            return;
          }

          const imageData = await imageResponse.json();
          
          // 対応するプランの画像とローディング状態を更新
          setPlans(currentPlans => currentPlans.map((p, i) => 
            i === index ? { ...p, image: imageData.imageUrl, imageLoading: false } : p
          ));

        } catch (e) {
          console.error(`Error fetching image for ${plan.title}:`, e);
          // エラー時もローディングを止める
          setPlans(currentPlans => currentPlans.map((p, i) => 
            i === index ? { ...p, imageLoading: false } : p
          ));
        }
      });

    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError('予期せぬエラーが発生しました。');
        }
        setTextLoading(false);
    }
  };

  const isLoading = textLoading || plans.some(p => p.imageLoading);

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
        <Button onClick={handleSearch} disabled={isLoading}>
          {textLoading ? 'プランを考え中...' : (plans.some(p => p.imageLoading) ? 'お皿を準備中...' : 'マジカル調理法を検索')}
        </Button>
      </Group>

      <Space h="xl" />

      {textLoading && (
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

      {plans.length > 0 && !textLoading && (
         <Stack>
            <Title order={2} ta="center">
              「{ingredient}」の変身プランはこちら！
            </Title>
            <Grid mt="md">
              {plans.map((plan, index) => (
                <Grid.Col span={{ base: 12, md: 4 }} key={index}>
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Skeleton visible={plan.imageLoading} height={160}>
                        <Image
                          src={plan.image || '/file.svg'} // フォールバック画像
                          height={160}
                          alt={plan.title}
                        />
                      </Skeleton>
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