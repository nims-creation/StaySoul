# Fix Tailwind dark color key conflict: rename 'dark' color → 'ink' across all source files
# Run from: StaySoul/frontend/

$srcDir = "src"

# Files to process for className/CSS changes
$files = Get-ChildItem -Path $srcDir -Recurse -Include "*.jsx","*.tsx","*.js","*.ts","*.css" | Select-Object -ExpandProperty FullName
$files += "tailwind.config.js"

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    $original = $content

    # In tailwind.config.js: rename the color key object 'dark' -> 'ink'
    if ($file -like "*tailwind.config.js") {
        # Rename the color key 'dark: {' -> 'ink: {'  (only inside colors block context)
        $content = $content.Replace("        dark: {", "        ink: {")
        # Rename sub-keys
        $content = $content.Replace("dark-heading", "ink-heading")
        $content = $content.Replace("dark-text:", "ink-text:")
        $content = $content.Replace("dark-muted:", "ink-muted:")
        $content = $content.Replace("dark-surface:", "ink-surface:")
        $content = $content.Replace("dark-elevated:", "ink-elevated:")
        $content = $content.Replace("dark-border:", "ink-border:")
        $content = $content.Replace("dark-bg:", "ink-bg:")
        $content = $content.Replace("dark-text'", "ink-text'")
        $content = $content.Replace("dark-muted'", "ink-muted'")
        $content = $content.Replace("dark-surface'", "ink-surface'")
    }

    # In all JSX/CSS source files: rename Tailwind utility classes
    # Order matters — do specific sub-classes before the bare 'dark'
    $content = $content.Replace("dark-heading", "ink-heading")
    $content = $content.Replace("dark-surface", "ink-surface")
    $content = $content.Replace("dark-elevated", "ink-elevated")
    $content = $content.Replace("dark-border", "ink-border")
    $content = $content.Replace("dark-muted", "ink-muted")
    $content = $content.Replace("dark-text", "ink-text")
    $content = $content.Replace("dark-bg", "ink-bg")

    # Replace bare 'text-dark', 'bg-dark', 'fill-dark', 'border-dark', 'hover:text-dark',
    # 'group-hover:text-dark', 'focus:ring-dark' etc.
    # Use regex to match -dark followed by a non-word boundary (space, quote, newline, end)
    $content = [regex]::Replace($content, '(?<=[a-z:\-])dark(?=[ "''`\r\n])', 'ink')
    # Also catch at start of a utility e.g. className="dark" or className="... dark ..."
    $content = [regex]::Replace($content, '\btext-dark\b', 'text-ink')
    $content = [regex]::Replace($content, '\bbg-dark\b', 'bg-ink')
    $content = [regex]::Replace($content, '\bfill-dark\b', 'fill-ink')
    $content = [regex]::Replace($content, '\bborder-dark\b', 'border-ink')
    $content = [regex]::Replace($content, '\bring-dark\b', 'ring-ink')

    if ($content -ne $original) {
        Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Updated: $file"
    }
}

Write-Host "`nDone! All 'dark' color references renamed to 'ink'."
