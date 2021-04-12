<script lang="ts">
import { defineComponent, h, resolveComponent } from "vue";

const s = (s: string) => s.replaceAll(/’/g, "'");
const isMatch = (a: string, b: string) => s(a) == s(b);
const isMismatch = (a: string, b: string) =>
  a && b && a.length && b.length && s(a) != s(b);
const someOfItIsCorrect = (a: string, b: string) =>
  isMismatch(a, b) && s(a).includes(s(b));
const notYetInput = (a: string, b: string) =>
  !a || !b || !a.length || !b.length;

export default defineComponent({
  props: {
    answer: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
  },
  computed: {
    wordList(): string[] {
      return this.answer.split(" ");
    },
    inputWordList(): string[] {
      return this.input.trim().split(" ");
    },
    complete(): boolean {
      return this.answer == this.input.trim();
    },
  },
  render() {
    return h("p", { class: "text-black text-opacity-10" }, [
      ...this.wordList.map((word, i) => {
        const input = this.inputWordList[i];
        if (notYetInput(word, input)) {
          return word + " ";
        }
        return h(
          "span",
          {
            class: [
              isMatch(word, input) && "text-green-600",
              isMismatch(word, input) && "text-red-600",
              "text-black",
              !isMatch(word, input) &&
                someOfItIsCorrect(word, input) &&
                "text-opacity-10",
            ],
          },
          word + " "
        );
      }),
      this.complete &&
        h(resolveComponent("CheckCircleIcon"), {
          class: "inline-block text-green-600",
          size: 17,
          title: "clear",
          decorative: true,
        }),
    ]);
  },
});
</script>
