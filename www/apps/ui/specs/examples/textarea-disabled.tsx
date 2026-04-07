import { Textarea } from "@moetnavss/ui"

export default function TextareaDisabled() {
  return (
    <Textarea
      disabled
      placeholder="Disabled textarea"
      aria-label="Disabled textarea"
    />
  )
}
