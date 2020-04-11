import axios from 'axios';

const RANDOM_WORD_URL = 'https://shlyapa-game.ru/api/v1/words';

type RandomWordResponse = {
  result: {
    total: number;
    data: [{
      value: string;
    }];
  };
}

export async function getRandomWords(count: number, complexity: 'low' | 'normal' | 'high' = 'normal'): Promise<string[]> {
  if (count < 1 || count > 100) return [];

  const words = await axios
    .get<RandomWordResponse>(`${RANDOM_WORD_URL}?complexity=${complexity}&language=rus&limit=${count}&offset=0&rand=true&randomSeed=36462&fields=[%22value%22]`)
    .then((response) => (response.data?.result?.data || []).map((obj) => obj.value))
    .catch((e) => {
      console.error(`Failed to getRandomWords from '${RANDOM_WORD_URL}': ${e}`);
    });

  return words || [];
}
