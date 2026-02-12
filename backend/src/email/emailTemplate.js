const emailTemplate = (name, clientURL) => {
  return `
   <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Chatify – Email</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        <div class="bg-indigo-600 text-white text-center py-6">
            <h1 class="text-2xl font-bold">Chatify</h1>
            <p class="text-sm opacity-90">Connect. Chat. Enjoy.</p>
        </div>

        <div class="p-6 space-y-4">
            <h2 class="text-xl font-semibold text-gray-800">
            Welcome to Chatify ${name ? name : "there"}!
            </h2>

            <p class="text-gray-600">
            Click the button below to open Chatify and start chatting with your friends.
            </p>

            <a
            href="${clientURL}"
            target="_blank"
            class="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
            >
            Open Chatify 🚀
            </a>

            <p class="text-sm text-gray-500">
            If the button doesn’t work, copy and paste this link into your browser:
            <br />
            <span class="break-all text-indigo-600">
                ${clientURL}
            </span>
            </p>
        </div>

        <div class="bg-gray-50 text-center text-xs text-gray-500 py-4">
            © 2026 Chatify. All rights reserved.
        </div>
        </div>
    </body>
    </html>
   `;
};

export default emailTemplate;
