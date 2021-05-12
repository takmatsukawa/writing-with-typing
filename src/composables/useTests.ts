import { useTextSets, TextSet } from "./useTextSets";
import { defaultModel, predictRecall, updateRecall } from "ebisu-js";
import { DataStore } from "@aws-amplify/datastore";
import { Log } from "../models/index";
import { ref, onMounted } from "vue";

export type Test = {
  textSet: TextSet;
  recallProbability: number;
};

export const useTests = () => {
  const loaded = ref(false);
  const tests = ref<Test[]>([]);
  const { packages, getPackages } = useTextSets();

  onMounted(async () => {
    await getPackages();

    packages.value.forEach((pkg) => {
      pkg.textSets.forEach((textSet) => {
        tests.value.push({
          textSet,
          recallProbability: 0,
        });
      });
    });

    loaded.value = true;
  });

  const getTest = () => {
    return tests.value[Math.floor(Math.random() * tests.value.length)];
  };

  return { loaded, getTest };
};
