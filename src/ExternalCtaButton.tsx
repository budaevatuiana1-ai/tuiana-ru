import './CtaButton.css'

type ExternalCtaButtonProps = {
  href: string
  children: React.ReactNode
  primary?: boolean
}

export default function ExternalCtaButton({
  href,
  children,
  primary = true,
}: ExternalCtaButtonProps) {
  return (
    <a
      className={`cta-button ${primary ? 'cta-button--primary' : 'cta-button--secondary'}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>{children}</span>
    </a>
  )
}
