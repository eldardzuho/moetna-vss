import { AdminOptions } from "@moetnavss/types"

export type BundlerOptions = Required<Pick<AdminOptions, "path">> &
  Pick<AdminOptions, "backendUrl" | "storefrontUrl" | "maxUploadFileSize"> & {
    outDir: string
    sources?: string[]
    plugins?: string[]
  }
