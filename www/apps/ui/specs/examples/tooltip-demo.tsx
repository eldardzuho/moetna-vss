import { InformationCircleSolid } from "@moetnavss/icons"
import { Tooltip } from "@moetnavss/ui"

export default function TooltipDemo() {
  return (
    <Tooltip content="The quick brown fox jumps over the lazy dog.">
      <InformationCircleSolid />
    </Tooltip>
  )
}
