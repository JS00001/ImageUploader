import { CgSpinner } from 'react-icons/cg'
import React, { HTMLAttributes } from 'react'
import { FileWithPath } from 'react-dropzone'
import { RiFileCloudLine, RiLinkM, RiCheckboxCircleFill } from 'react-icons/ri'

export type UploadedFile = HTMLAttributes<HTMLDivElement> & {
  file: FileWithPath
  completed?: boolean
  url?: string
}

export const UploadedFile: React.FC<UploadedFile> = ({
  file,
  url = '',
  completed = false,
  ...props
}) => {
  const size = Math.round((file.size / 1024 / 1024) * 100) / 100 + ' megabytes'

  const copyUrl = () => {
    if (url) navigator.clipboard.writeText(url)
  }

  return (
    <div className="mt-4 rounded-lg bg-slate-50 p-4" {...props}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="mr-5">
            <RiFileCloudLine size={30} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{file.path}</span>
            <span className="text-xs font-medium">{size}</span>
          </div>
        </div>

        {completed && (
          <div className="flex flex-row items-center space-x-2">
            <RiLinkM
              size={22}
              className="cursor-pointer hover:text-gray-300"
              onClick={copyUrl}
            />
            <RiCheckboxCircleFill size={22} className="text-green-400" />
          </div>
        )}

        {!completed && (
          <div className="flex flex-row items-center space-x-2">
            <RiLinkM size={22} className="text-gray-200" />
            <CgSpinner size={22} className="animate-spin text-slate-500" />
          </div>
        )}
      </div>
    </div>
  )
}
