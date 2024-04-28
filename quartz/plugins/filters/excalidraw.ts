import { QuartzFilterPlugin } from "../types"

export const ExcaliDrawFilter: QuartzFilterPlugin = () => ({
    name: "ExcaliDrawFilter",
    shouldPublish(_ctx, [_tree, vfile]) {
        return vfile.path.endsWith(".excalidraw")
    },
})