type Config = {
  api: {
    url: string
  }
}

export const config: Config = {
  api: {
    url: process.env.REACT_APP_API_URL ?? ''
  }
}
