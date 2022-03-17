import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone'
import { RiFileUploadLine } from 'react-icons/ri'

import api from '../api'
import Head from 'next/head'
import Navbar from '../components/Layout/Navbar'
import { UploadedFile } from '../components/Shared/UploadedFile'

interface IFile {
  [key: number]: {
    file: FileWithPath
    completed: boolean
    error: boolean
    url: string | null
  }
}

export default function () {
  const [fileIndex, setFileIndex] = useState(0)
  const [files, setFiles] = useState<IFile>({})

  const onDropAccepted = async (file: Array<FileWithPath>) => {
    file.forEach(async (f) => {
      const newFile: IFile = {
        [fileIndex]: {
          file: f,
          completed: false,
          error: false,
          url: null,
        },
      }
      setFiles({ ...files, ...newFile })

      const res: AxiosResponse = await api.upload(file[0])

      const completedFile: IFile = {
        [fileIndex]: {
          file: f,
          completed: true,
          error: false,
          url: res.data.message,
        },
      }
      setFileIndex(fileIndex + 1)
      setFiles({ ...files, ...completedFile })
    })
  }

  const onDropRejected = (file: Array<FileRejection>) => {
    file.forEach((f) => {
      const rejectedFile: IFile = {
        [fileIndex]: {
          file: f.file,
          completed: false,
          error: true,
          url: null,
        },
      }

      setFileIndex(fileIndex + 1)
      setFiles({ ...files, ...rejectedFile })
    })
  }

  const clearUploads = () => {
    setFiles({})
    setFileIndex(0)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDropAccepted,
    onDropRejected,
  })

  return (
    <>
      <Head>
        <title>Jack Senyitko - Software Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <Navbar />
      </nav>

      <main>
        <div className="flex justify-center pt-32">
          <div className="rounded-xl bg-slate-200 p-20 text-slate-500">
            <div className="dropzone " {...getRootProps()}>
              <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
                <div className="flex flex-col items-center justify-center px-44 py-20 font-medium">
                  <input {...getInputProps()} />
                  <RiFileUploadLine size={64} />
                  <span>Upload Here</span>
                </div>
              </div>
            </div>
            <div className="p-2 font-medium">
              <div className="flex justify-between">
                <span>{fileIndex} Uploads</span>
                <span onClick={clearUploads} className="cursor-pointer">
                  Clear
                </span>
              </div>
            </div>
            <div>
              {Object.entries(files).map((entry) => {
                const [_, file] = entry
                return <UploadedFile {...file} />
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
