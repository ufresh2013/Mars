import { Bar } from '@antv/g2plot'

// 条形图
export function rowBar(el, commonOption) {
  return new Bar(el, {
    ...commonOption,
    xField: 'y',
    yField: 'x',
    seriesField: 'yGroup',
    isGroup: true,
  })
}
