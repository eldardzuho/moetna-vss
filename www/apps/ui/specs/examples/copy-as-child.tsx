import { PlusMini } from "@moetnavss/icons"
import { Copy, IconButton, Text } from "@moetnavss/ui"

export default function CopyAsChild() {
  return (
    <div className="flex items-center gap-x-2">
      <Text>Copy command</Text>
      <Copy content="yarn add @moetnavss/ui" asChild>
        <IconButton>
          <PlusMini />
        </IconButton>
      </Copy>
    </div>
  )
}
