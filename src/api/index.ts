import axios, { AxiosResponse} from 'axios'
import FormData from 'form-data'
import { FileWithPath } from 'react-dropzone'

const baseUrl = 'https://jsen-backend.herokuapp.com'

export default {
  upload: (file: FileWithPath): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('upload', file)
      axios
        .post(`${baseUrl}/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          resolve(response)
        })
    })
  },
}
