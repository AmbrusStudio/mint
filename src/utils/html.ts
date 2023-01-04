import createDOMPurify from 'dompurify'

export function cleanupHTML(dirty: string): string {
  if (typeof window === 'undefined') return dirty
  const DOMPurify = createDOMPurify(window)
  DOMPurify.addHook('afterSanitizeAttributes', function (node) {
    if (node.tagName === 'A' && 'target' in node) {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener')
    }
  })
  const clean = DOMPurify.sanitize(dirty)
  return clean
}
