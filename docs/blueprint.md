# **App Name**: Pre-Delinquency Intervention Engine

## Core Features:

- Admin Authentication: Secure admin login with role-based dashboard access.
- Customer Data Management: CRUD operations for customer records: Customer ID, Name, Age, Income, Loan Amount, EMI Amount, Payment History, Credit Score, Missed Payments, Transaction Behavior Score.
- Risk Prediction Engine: Integrate an AI model (mock if necessary) to generate a Risk Score (0–100) and classify customers into risk categories (Low, Medium, High).
- Intervention Recommendation Tool: Based on risk category, the application uses an AI tool that recommends interventions: Friendly Reminder (Low), Payment Restructuring (Medium), Immediate Outreach (High).
- Dashboard Visualization: Display Total customers, Risk distribution (Pie Chart), Risk trend (Line Graph), and a High-risk customer list in an analytics dashboard.
- Risk Monitoring and Reporting: Provide a risk monitoring page, filtering by risk category, and exportable CSV reports. Display Model accuracy metrics.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) to evoke trust and stability in a financial context.
- Background color: Very light grey-blue (#F0F4F8), a desaturated variant of the primary color.
- Accent color: Vibrant Cyan (#00BCD4) for highlighting key metrics and interactive elements.
- Body font: 'Inter' sans-serif for clear, professional text.
- Headline font: 'Space Grotesk' sans-serif for impactful headers, short text only. Longer text should use 'Inter'.
- Use clean, minimalist icons to represent data and actions. Use the Feather icons library.
- Implement a modern, card-based layout with ample white space. The React implementation must be fully responsive.