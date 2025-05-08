# NZ Banks API Fee Revenue Calculator

An interactive web application that visualizes the potential revenue New Zealand's "Big 4" banks (ANZ, ASB, BNZ, and Westpac) could generate from open banking API fees under the Customer and Product Data Act 2025.

## Features

- Adjust key parameters such as API calls per customer, percentage of customers using open banking, and more
- View projected annual revenue for each bank
- Compare different revenue streams (data API fees vs. payment initiation fees)
- Visualize data with interactive charts
- Learn about New Zealand's open banking API fee structure

## Background

New Zealand's open banking API fees have been a contentious topic, as the government's regulatory framework allows banks to charge third-party providers (TPPs) for accessing customer data, a policy that diverges from international norms.

### Fee Structure Under the Customer and Product Data Act 2025
- **Data Requests**: Banks can charge accredited TPPs up to **1 cent per successful API call** or a **maximum of $5 per customer per month** for near-real-time transaction data access.
- **Payment Initiation**: Fees for payment requests are capped at **5 cents per transaction**.
- **Prohibited Charges**: Banks cannot pass these fees directly to end customers.

This calculator helps visualize the financial impact of these fees based on various adoption scenarios.

## Technology Stack

- React
- TypeScript
- Vite
- Chakra UI for component styling
- Chart.js for data visualization

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## License

MIT