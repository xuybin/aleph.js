declare module "aleph/vue" {
  export function bootstrap(options?: { root?: string | HTMLElement; hydrate?: boolean }): void;
  export { useData } from "aleph/runtime/vue/data.ts";
  export { useRouter } from "aleph/runtime/vue/router.ts";
  export { Link } from "aleph/runtime/vue/link.ts";
  export { Head } from "aleph/runtime/vue/head.ts";
}

declare module "vue" {
  export { DefineComponent, defineComponent, h } from "https://esm.sh/vue@3.2.37";
}
