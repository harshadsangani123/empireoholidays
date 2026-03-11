<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #2563eb;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 22px;
        }
        .info-row {
            margin-bottom: 12px;
        }
        .info-label {
            font-weight: bold;
            color: #555;
            display: inline-block;
            width: 120px;
        }
        .info-value a {
            color: #2563eb;
            text-decoration: none;
        }
        .message-box {
            background-color: #f9f9f9;
            border-left: 4px solid #2563eb;
            padding: 15px;
            margin-top: 10px;
            border-radius: 4px;
            white-space: pre-line;
        }
        .timestamp {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            text-align: right;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New Contact Message</h1>
        </div>

        <div class="info-row">
            <span class="info-label">Name:</span>
            <span class="info-value">{{ $data['name'] ?? 'N/A' }}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value">
                <a href="mailto:{{ $data['email'] ?? '' }}">{{ $data['email'] ?? 'N/A' }}</a>
            </span>
        </div>
        <div class="info-row">
            <span class="info-label">Phone:</span>
            <span class="info-value">
                <a href="tel:{{ $data['phone'] ?? '' }}">{{ $data['phone'] ?? 'N/A' }}</a>
            </span>
        </div>

        <h3>Message</h3>
        <div class="message-box">
            {{ $data['message'] ?? 'No message provided.' }}
        </div>

        <div class="timestamp">
            Received: {{ now()->format('F d, Y \\a\\t g:i A') }}
        </div>

        <div class="footer">
            <p>This is an automated email from {{ config('app.name') }}.</p>
            <p>Please respond directly to the customer's email address above.</p>
        </div>
    </div>
</body>
</html>


