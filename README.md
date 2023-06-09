# Code Sample

This sample shows you how to integrate with Seel Return Assurance service on checkout page.

## Integration Guide

### 1. **Include SDK**

```jsx
<script src="https://cdn.seel.com/scripts/sample/marketplace-embedded.min.js"></script>
```

Access the APIs through the global object window, taking care to use the `SeelSDK` namespace.

```jsx
const { Events, seelSDK } = window.SeelSDK || {};
const { createQuote, placeOrder } = seelSDK || {};
```

### 2. Provide the host element.

Add an element to the page template and set the ID to `seel-ra-widget-root` as an anchor for the insurance component.

```html
<div id="seel-ra-widget-root"></div>
```

### 3. Set up listeners for widget events.

Display the price of insurance products in the billing details based on the user's selection, and update the total price accordingly.

```jsx
const { Events } = window.SeelSDK || {};

document.addEventListener(Events.checked, (event) => {
  /*
	When the user checks the assurance box, you can obtain 
  the checked status and quote data from the event.detail.
  shape of event.detail
	{ 
	  price, 
	  checked, 
	  quoteId, 
	  total, 
	  extraInfo 
	} 
  At this point, you can insert an assurance line into your 
  order and update the total.
  */
});
document.addEventListener(Events.unchecked, (event) => {
  /*
	When the user sets the assurance as checked, you can retrieve
  the checked status and quote data from event.detail.
  shape of event.detail
	{ 
	  price, 
	  checked, 
	  quoteId, 
	  total, 
	  extraInfo 
	} 
	At this point, you can remove the assurance line and update the total.
  */
});
```

### 4. Create a quote from cart data.

If the current shopping cart item is insurable and has a successful quote result, the insurance component will be automatically inserted into the container provided in step 2.

```jsx
// Mock input parameters always returns a successful quote.
const items = [
  {
    product_url: 'url',
    quantity: 1,
    price: 34.33,
    title: 'mock_success',
  },
];

// Deconstruct the createQuote API from the SeelSDK object.
const { Events, seelSDK } = window.SeelSDK || {};
const { createQuote } = seelSDK || {};
createQuote({ items });
```

### 5. Place your order.

After successfully submitting the current order, use its order number as input and call the placeOrder API.

```jsx
// Mock input parameters always returns a successful order.
const orderNo = order_1234

// Deconstruct the placeOrder API from the SeelSDK object.
const { Events, seelSDK } = window.SeelSDK || {};
const { placeOrder } = seelSDK || {};
placeOrder(orderNo)
```

## Demo

[live demo](https://page.seel.com/marketplace/return-assurance-sample/checkout.html)

## Run Sample Locally

### clone this repository

### Install dependencies.

```bash
npm install
```

### Run a local server.

```bash
npm run serve
```

If you want to preview the modified effect in real time, please use the following method. 

```bash
npm run watch
```

## FAQ

## Get Supported