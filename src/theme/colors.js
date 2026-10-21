// ShopCart brand palette: mono + one emerald accent.
// Single source of truth: tailwind.config.js builds the className tokens
// (bg-ink, text-muted…) from this file, and components import it for props
// that need a raw color (icon colors, placeholderTextColor).
module.exports = {
  ink: '#111111',
  muted: '#6B7280',
  line: '#E7E5E4',
  canvas: '#FAFAF9',
  tile: '#F2F2F0',
  accent: '#059669',
  white: '#FFFFFF',
  placeholder: '#9CA3AF',
};
