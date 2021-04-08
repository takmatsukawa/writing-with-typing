import { ref } from "vue";

type TextSet = {
  id: string;
  native: string;
  target: string;
};

export const useTextSets = () => {
  const texts = ref<TextSet[]>([]);

  texts.value = [
    {
      id: "1",
      native:
        "JavaScriptは、世界で最もクールな言語の一つであることは間違いなく、日に日に人気が高まっています。そのため、開発者コミュニティは、JSを使い続けてきた結果、いくつかのコツやヒントを見つけてきました。今日は、その中から11のヒントをご紹介します。",
      target:
        "JavaScript is no doubt one of the coolest languages in the world and is gaining more and more popularity day by day. So the developer community has found some tricks and tips after using JS for quite a while now. Today I will share 11 Tips & Tricks With You!",
    },
  ];

  return { texts };
};
