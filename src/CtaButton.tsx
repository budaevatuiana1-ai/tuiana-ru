import { Link, type LinkProps } from 'react-router-dom'
import './CtaButton.css'

type CtaButtonProps = LinkProps & {
  children: React.ReactNode
  arrow?: boolean
}

export default function CtaButton({
  children,
  arrow = true,
  ...props
}: CtaButtonProps) {
  return (
    <Link className="cta-button" {...props}>
      <span>{children}</span>
      {arrow && (
        <span className="cta-button__arrow" aria-hidden="true">
          →
        </span>
      )}
    </Link>
  )
}
