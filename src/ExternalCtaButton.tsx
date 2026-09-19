import './CtaButton.css'

type ExternalCtaButtonProps = {
  href: string
  children: React.ReactNode
  primary?: boolean
  onClick?: () => void
}

export default function ExternalCtaButton({
  href,
  children,
  primary = true,
  onClick,
}: ExternalCtaButtonProps) {
  return (
    <a
      className={`cta-button ${primary ? 'cta-button--primary' : 'cta-button--secondary'}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      <span>{children}</span>
    </a>
  )
}
