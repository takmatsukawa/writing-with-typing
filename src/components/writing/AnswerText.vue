<script lang="ts">
import { defineComponent, h, resolveComponent } from "vue";

import {
  isMatch,
  isMismatch,
  someOfItIsCorrect,
  notYetInput,
  s,
} from "../../utilities/textMatcher";

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
    answerTextOpacity: {
      type: Number as () => 0 | 10,
      default: 10,
    },
  },
  computed: {
    wordList(): string[] {
      return this.answer.trim().split(/\s/);
    },
    inputWordList(): string[] {
      return this.input.trim().split(/\s/);
    },
    complete(): boolean {
      return s(this.answer.trim()) == s(this.input.trim());
    },
  },
  render() {
    return h(
      "p",
      {
        class: [
          "text-black",
          this.answerTextOpacity == 0 && "text-opacity-0",
          this.answerTextOpacity == 10 && "text-opacity-10",
        ],
      },
      [
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
      ]
    );
  },
});
</script>
