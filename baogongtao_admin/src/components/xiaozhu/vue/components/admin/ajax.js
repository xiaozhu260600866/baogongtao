const getBody = (xhr) => {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }
  try {
    return JSON.parse(text)
  } catch (error) {
    return text
  }
}

export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new XMLHttpRequest()
  const action = localStorage.getItem('siteName') + option.uploadProps.action

  if (xhr.upload) {
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      option.onProgress(e)
    }
  }
  const formData = new FormData()
  const filename = option.file.name || `${Date.now()}.jpeg`

  // alert("a");
   if (option.uploadProps.data) {
    Object.keys(option.uploadProps.data).forEach(key => {
      formData.append(key, option.uploadProps.data[key])
    })
  }
  formData.append('file', option.file, filename)

  xhr.open('POST', action, true)
  xhr.send(formData)
  // onload
  xhr.onload = function onload() {
    // success
    if (xhr.readyState === 4 && xhr.status === 200) {
      option.onSuccess(getBody(xhr))
    }
    // error
    if (xhr.status < 200 || xhr.status >= 300) {
      // return option.onError(getError(action, option, xhr), getBody(xhr));
    }
  }
}
