export default function SvgIcon({
  size = 14,
  name,
  style = {},
  className = '',
}) {
  return (
    <svg
      style={{ width: size + 'px', height: size + 'px', ...style }}
      className={`${className}`}
    >
      <use href={`#icon-${name}`} />
    </svg>
  )
}
