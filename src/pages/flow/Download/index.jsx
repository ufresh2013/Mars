import React from 'react'
import {
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from '@xyflow/react'
import { toPng } from 'html-to-image'

function downloadImage(dataUrl) {
  const a = document.createElement('a')
  a.setAttribute('download', '流程图.png')
  a.setAttribute('href', dataUrl)
  a.click()
}

const imageWidth = 1024
const imageHeight = 768

function DownloadButton() {
  const { getNodes } = useReactFlow()

  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes())
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      1
    )

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#fff',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      downloadImage(dataUrl)
    })
  }

  return (
    <button className="download-btn" onClick={onClick}>
      导出为图片
    </button>
  )
}

export default DownloadButton
