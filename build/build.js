

build({
  entry: 'index.js',
  output: 'chatime.js'
})

if (isProb) {
  console.log('Is Production Enviroment')
  build({
    entry: 'index.js',
    output: 'chatime.min.js',
    plugins: [uglify()]
  })
}



