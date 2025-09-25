import { Container, Title, Text, Button, Space } from '@mantine/core';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container style={{ textAlign: 'center', marginTop: '64px' }}>
      <Title order={1}>へんしんマジック・キッチン</Title>
      <Text size="lg" color="dimmed">
        苦手な食べ物を、魔法のレシピで大好きに変えよう！
      </Text>
      <Space h="xl" />
      <Button component={Link} href="/login" size="lg">
        はじめる
      </Button>
    </Container>
  );
}