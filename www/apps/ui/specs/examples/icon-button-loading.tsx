import { PlusMini } from "@moetnavss/icons"
import { IconButton } from "@moetnavss/ui"

export default function IconButtonLoading() {
  return (
    <IconButton isLoading className="relative">
      <PlusMini />
    </IconButton>
  )
}
