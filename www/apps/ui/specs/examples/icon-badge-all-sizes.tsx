import { IconBadge } from "@moetnavss/ui"
import { BuildingTax } from "@moetnavss/icons"

export default function IconBadgeAllSizes() {
  return (
    <div className="flex gap-3 items-center">
      <IconBadge size="base">
        <BuildingTax />
      </IconBadge>
      <IconBadge size="large">
        <BuildingTax />
      </IconBadge>
    </div>
  )
}
