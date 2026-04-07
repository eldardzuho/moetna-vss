import { Input } from "@moetnavss/ui"

export default function InputPassword() {
  return (
    <div className="w-[250px]">
      <Input id="password" type="password" defaultValue="supersecret" />
    </div>
  )
}
