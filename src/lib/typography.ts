const NBSP = '\u00A0'

const SHORT_WORDS =
  'в|во|к|ко|с|со|у|о|об|от|до|по|на|за|из|и|а|для|без|под|над|при|про'

const SHORT_WORD_RE = new RegExp(
  `(^|[\\s«"'(\\[])(${SHORT_WORDS})[ \\t]`,
  'gi',
)

export function ruTypo(text: string): string {
  return text.replace(SHORT_WORD_RE, `$1$2${NBSP}`)
}
