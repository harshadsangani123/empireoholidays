<html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        @vite('resources/js/app.js')
        <!-- Global Google reCAPTCHA v2 script (auto-renders any .g-recaptcha elements) -->
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>