
export const WHITELIST = [
  'http://localhost:3000',
  'http://192.168.0.102:19000'
]

export const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  optionsSuccessStatus: 200 
}