<script lang="ts">
import { defineComponent, h, ref, onMounted, onUpdated } from "vue";
import MarkdownIt from "markdown-it";

export default defineComponent({
  props: {
    source: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const md = ref();

    const renderMarkdown = () => {
      let markdown = new MarkdownIt();

      md.value = markdown.render(props.source);
    };

    onMounted(() => renderMarkdown());
    onUpdated(() => renderMarkdown());

    return () => h("div", { innerHTML: md.value });
  },
});
</script>
