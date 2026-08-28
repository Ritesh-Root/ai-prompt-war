// HTML shell — PayPen-inspired clean dashboard (white / minimal / dark-navy accents)
export const page = () => `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PromptShala — AI ki Barakhadi</title>
<link rel="icon" href="/static/favicon.svg" type="image/svg+xml">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@500;600;700;800&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  theme: { extend: {
    colors: { ink: '#23252F', inksoft: '#3A3D4D', paper: '#F7F8FA', line: '#ECEDF1', accent: '#23252F', saffron: '#FF8A3D', leaf: '#2FA36B' },
    fontFamily: { sans: ['Nunito','sans-serif'], display: ['"Baloo 2"','Nunito','sans-serif'] },
    boxShadow: { card: '0 1px 3px rgba(35,37,47,.06), 0 8px 24px rgba(35,37,47,.05)' }
  }}
}
</script>
<link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-paper font-sans text-ink antialiased">
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
<script src="/static/views.js"></script>
<script src="/static/views2.js"></script>
<script src="/static/app.js"></script>
</body>
</html>`
