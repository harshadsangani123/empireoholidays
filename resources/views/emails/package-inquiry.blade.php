<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Package Inquiry</title>
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
            background-color: #f53003;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 30px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .info-section {
            margin-bottom: 25px;
        }
        .info-section h2 {
            color: #f53003;
            font-size: 18px;
            margin-bottom: 10px;
            border-bottom: 2px solid #f53003;
            padding-bottom: 5px;
        }
        .info-row {
            margin-bottom: 15px;
        }
        .info-label {
            font-weight: bold;
            color: #666;
            display: inline-block;
            width: 150px;
        }
        .info-value {
            color: #333;
        }
        .message-box {
            background-color: #f9f9f9;
            border-left: 4px solid #f53003;
            padding: 15px;
            margin-top: 10px;
            border-radius: 4px;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
        .timestamp {
            font-size: 12px;
            color: #999;
            margin-top: 20px;
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New Package Inquiry</h1>
        </div>

        <div class="info-section">
            <h2>Package Information</h2>
            <div class="info-row">
                <span class="info-label">Package:</span>
                <span class="info-value">{{ $inquiryData['package_name'] ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Type:</span>
                <span class="info-value">{{ ucfirst($inquiryData['package_type'] ?? 'N/A') }}</span>
            </div>
        </div>

        <div class="info-section">
            <h2>Customer Information</h2>
            <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">{{ $inquiryData['name'] ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">
                    <a href="mailto:{{ $inquiryData['email'] ?? '' }}">{{ $inquiryData['email'] ?? 'N/A' }}</a>
                </span>
            </div>
            <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">
                    <a href="tel:{{ $inquiryData['phone'] ?? '' }}">{{ $inquiryData['phone'] ?? 'N/A' }}</a>
                </span>
            </div>
        </div>

        @if(!empty($inquiryData['travel_date']) || !empty($inquiryData['number_of_travelers']))
        <div class="info-section">
            <h2>Travel Details</h2>
            @if(!empty($inquiryData['travel_date']))
            <div class="info-row">
                <span class="info-label">Travel Date:</span>
                <span class="info-value">{{ \Carbon\Carbon::parse($inquiryData['travel_date'])->format('F d, Y') }}</span>
            </div>
            @endif
            @if(!empty($inquiryData['number_of_travelers']))
            <div class="info-row">
                <span class="info-label">Travelers:</span>
                <span class="info-value">{{ $inquiryData['number_of_travelers'] }} {{ $inquiryData['number_of_travelers'] == 1 ? 'person' : 'people' }}</span>
            </div>
            @endif
        </div>
        @endif

        <div class="info-section">
            <h2>Message</h2>
            <div class="message-box">
                {{ $inquiryData['message_text'] ?? 'No message provided.' }}
            </div>
        </div>

        <div class="timestamp">
            Received: {{ now()->format('F d, Y \a\t g:i A') }}
        </div>

        <div class="footer">
            <p>This is an automated email from {{ config('app.name') }}.</p>
            <p>Please respond directly to the customer's email address: <a href="mailto:{{ $inquiryData['email'] ?? '' }}">{{ $inquiryData['email'] ?? 'N/A' }}</a></p>
        </div>
    </div>
</body>
</html>

