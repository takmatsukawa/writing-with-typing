import { ref } from "vue";
import { Auth } from 'aws-amplify';
import { get } from "../fetch";
const yamls = import.meta.globEager("../../packages/*.yaml");

type Package = {
  id: string;
  title: string;
  textSets: TextSet[];
};

type TextSet = {
  id: string;
  confident?: boolean;
  native: string;
  target: string;
};

export const useTextSets = () => {
  const packages = ref<Package[]>([]);
  // for (const path in yamls) {
  //   const yaml = Object.assign({}, yamls[path] as Package);
  //   if (!yaml.textSets) {
  //     yaml.textSets = [];
  //   }
  //   packages.value.push(yaml);
  // }

  // packages.value.sort((a, b) =>
  //   a.title < b.title ? -1 : a.title > b.title ? 1 : 0
  // );

  const getPackages = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const pkgs = await get<{ contents: Package[] }>(
      `https://writing-with-typing.microcms.io/api/v1/packages?filters=owner[equals]${user.username}`,
      {
        headers: { "X-API-KEY": "117f3ccd-197e-49cd-89d4-6a4c017e9ce5" },
      }
    );
    packages.value = [...packages.value, ...pkgs.contents];
  };

  return { packages, getPackages };
};
