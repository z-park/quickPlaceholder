#! /usr/bin/env node
const Jimp = require('jimp')
const path = require('path')
const argv = require('yargs').argv
const program = require('commander')

const DEFAULT_OPTIONS = {
  size: '200 * 200',
  textMeta: {
    text: '200 x 200'
  },
  backgroundColor: '#f1ebeb',
  filename: '200x200.jpg'
}

let options = Object.assign(DEFAULT_OPTIONS, argv)

options.text = options.size
options.width = parseInt(options.size.split('*')[0].trim(), 10)
options.height = parseInt(options.size.split('*')[1].trim(), 10)
options.textMeta.text = argv.text || `${options.width} x ${options.height}`
options.filename = argv.filename || `${options.width}x${options.height}.jpg`

function vaildArgv() {
  // if(!options.name) {
  //   console.error('请填写文件名! 参数:--name "filename.jpg"')
  // }
  return true
}

console.log(options)

function generateImg(options) {
  Jimp
    .loadFont(Jimp.FONT_SANS_32_BLACK)
    .then(font => {
      new Jimp(options.width, options.height, options.backgroundColor, (err, image) => {
        image.print(
          font,
          0,
          0,
          {
            text: options.textMeta.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          },
          options.width,
          options.height,
          (err, image) => {
            image.writeAsync(options.filename)
          }
        );
      });
    })
}

function main() {
  if(vaildArgv()) {
    generateImg(options)
  }
}
main()
