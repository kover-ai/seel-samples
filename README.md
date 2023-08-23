# Code Sample

This sample shows you how to integrate with Seel Shipping Protection service on checkout page.

## Integration Guide

### 1. **Include SDK**

```jsx
<script src="https://cdn.seel.com/sdk/sandbox/marketplace-sp-embedded.min.js"></script>
```

Access the APIs through the global object window, taking care to use the `SeelSDK` namespace.

```jsx
const { Events, seelSDK } = window.SeelSDK || {};
const { createQuote, createOrder } = seelSDK || {};
```

### 2. Provide the host element.

Add an element to the page template and set the ID to `seel-sp-widget-root` as an anchor for the assurance component.

```html
<div id="seel-sp-widget-root"></div>
```

### 3. Set up listeners for widget events.

Display the price of assurance products in the billing details based on the user's selection, and update the total price accordingly.

```jsx
const { Events } = window.SeelSDK || {};

document.addEventListener(Events.checked, (event) => {
  /*
	When the user selects the assurance box, retrieve the checked status and quote data from the event.detail object.
	The structure of event.detail is as follows:
	{
		price,
		checked,
		quoteId,
		total,
		extraInfo
	}
	At this stage, you can add an assurance line to the order and update the total accordingly.
  */
});
document.addEventListener(Events.unchecked, (event) => {
  /*
	When the user marks the assurance as unchecked, retrieve the checked status and quote data from event.detail.
	The structure of event.detail is as follows:
	{
		price,
		checked,
		quoteId,
		total,
		extraInfo
	}
	At this stage, you can remove the assurance line and update the total accordingly.
  */
});
```

### 4. Create a quote from cart data.

If the current item in the shopping cart is insurable and has a successful quote result, the assurance component will be automatically inserted into the container provided in step 2.

```jsx
// The mock input parameters always return a successful quote.
const quote_param = {
	"line_items": [
	{
		"line_item_id": "123",
		"price": 62.40
	}
	]
};

// Deconstruct the createQuote API from the SeelSDK object.
const { Events, seelSDK } = window.SeelSDK || {};
const { createQuote } = seelSDK || {};
createQuote({ quote_param });
```

### 5. Create your order.

After successfully submitting the current order, use its order number as input and call the createOrder API.

```jsx
// The mock input parameters always returns a successful order.
const order_param = {
	"line_items": [
	{
		"line_item_id": "123",
		"price": 62.40
	}
	],
	"order_id": "12345"
};

// Deconstruct the createOrder API from the SeelSDK object.
const { Events, seelSDK } = window.SeelSDK || {};
const { createOrder } = seelSDK || {};
createOrder(order_param)
```

## Demo

[live demo](https://page.seel.com/marketplace/shipping-assurance-sample/index.html)

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