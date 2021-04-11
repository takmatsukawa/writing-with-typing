import { ref } from "vue";
const yamls = import.meta.globEager("../../packages/*.yaml");

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
  for (const path in yamls) {
    const yaml = Object.assign({}, yamls[path] as Package);
    if (!yaml.textSets) {
      yaml.textSets = [];
    }
    packages.value.push(yaml);
  }

  packages.value.sort((a, b) =>
    a.title < b.title ? -1 : a.title > b.title ? 1 : 0
  );

  return { packages };
};
