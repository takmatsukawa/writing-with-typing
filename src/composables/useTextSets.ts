import { ref } from "vue";

type Package = {
  id: string;
  title: string;
  textSets: TextSet[];
};

type TextSet = {
  id: string;
  native: string;
  target: string;
};

export const useTextSets = () => {
  const packages = ref<Package[]>([]);
  packages.value = [
    {
      id: "2",
      title: "Blog Title",
      textSets: [],
    },
    {
      id: "1",
      title: "Blog introductions",
      textSets: [
        {
          id: "1",
          native: `JavaScriptは、世界で最もクールな言語の一つであることは間違いなく、日に日に人気が高まっています。そのため、開発者コミュニティは、JSを使い続けてきた結果、いくつかのコツやヒントを見つけてきました。今日は、その中から11のヒントをご紹介します。  
[8 JavaScript Tips & Tricks That No One Teaches 🚀](https://dev.to/garvitmotwani/8-javascript-tips-tricks-that-no-one-teaches-24g1)`,
          target:
            "JavaScript is no doubt one of the coolest languages in the world and is gaining more and more popularity day by day. So the developer community has found some tricks and tips after using JS for quite a while now. Today I will share 11 Tips & Tricks With You!",
        },
        {
          id: "2",
          native: `GraphQLは、APIのデータを読み込んだり、変更したりするためのクエリ言語です。これが終わる頃には、GraphQLとは何か、どのように機能するのか、RESTとはどう違うのかを理解していることでしょう。また、さらに研究を進めるためのリソースも紹介します。簡潔に説明することを心がけます。            
[What is GraphQL?](https://dev.to/daliboru/what-is-graphql-2031)`,
          target:
            "GraphQL is a query language for reading and mutating data in APIs. By the end of this, you'll understand what GraphQL is, how it works and how's it different from REST. I will also provide some resources for further research. I'll try to be concise...",
        },
        {
          id: "3",
          native: `私はReactの世界やNode.jsの世界で起こっていることになんとか触れていますし、自分のエンジニアリングマネジメントスキルも更新し続けています。そこで最近、何人かの同僚から、私の情報源を共有するように頼まれました。            
[How I Stay Up To Date](https://dev.to/johannes_scha/how-i-stay-up-to-date-iik)`,
          target:
            "I've managed to stay in touch with what is happening in the React world, the Node.js world and also keep on updating my engineering management skills. So recently some colleagues asked me to share my sources.",
        },
      ],
    },
    {
      id: "0",
      title: "Test package",
      textSets: [
        {
          id: "-1",
          native: "こんにちは",
          target: "Hello.",
        },
        {
          id: "-2",
          native: "調子はどう？",
          target: "How is it going?",
        },
      ],
    },
  ];

  return { packages };
};
