# MoetnaVSS

Modular Commerce Platform

## About

MoetnaVSS is a commerce platform with a built-in framework for customization that allows you to build custom commerce applications without reinventing core commerce logic. The framework and modules can be used to support advanced B2B or DTC commerce stores, marketplaces, distributor platforms, PoS systems, service businesses, or similar solutions that need foundational commerce primitives.

## Architecture

- **34 commerce modules** - Product, Order, Cart, Payment, Fulfillment, Inventory, Pricing, Promotion, Customer, Auth, Tax, Region, Notification, RBAC, and more
- **36 workflow categories** - Pre-built business logic with Saga-pattern distributed transactions
- **70 REST API endpoints** - 52 admin + 18 store
- **Admin Dashboard** - React-based admin UI
- **14 providers** - Auth, Payment, File, Notification, Fulfillment, Locking, Caching, Analytics

## Getting Started

```bash
# Install dependencies
yarn install

# Build all packages
yarn build

# Start the server
yarn medusa start
```

## Environment Variables

```env
DATABASE_URL=postgres://user:password@your-coolify-host:5432/moetnavss
REDIS_URL=redis://localhost:6379
```

## License

Licensed under the [MIT License](LICENSE).

Based on [Medusa](https://github.com/medusajs/medusa) by MedusaJS.
