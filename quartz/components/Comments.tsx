import { QuartzComponentConstructor } from "./types"

export default (() => {
    function Footer() {
        return (
        <script src="https://giscus.app/client.js"
            data-repo="BEMELON/blog"
            data-repo-id="R_kgDOLd4Vtg"
            data-category="Q&A"
            data-category-id="DIC_kwDOLd4Vts4CfAHA"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="preferred_color_scheme"
            data-lang="en"
            crossorigin="anonymous"
            async>
        </script>
        )
    }

    return Footer
}) satisfies QuartzComponentConstructor