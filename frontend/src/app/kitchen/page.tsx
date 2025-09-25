import { Container, Title, Text } from '@mantine/core';

export default function KitchenPage() {
  return (
    <Container>
      <Title order={1}>へんしんマジック・キッチン</Title>
      <Text size="lg" color="dimmed">
        AIに相談して、苦手な食材を「変身」させよう！
      </Text>
    </Container>
  );
}