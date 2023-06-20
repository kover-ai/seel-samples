# Code Sample

This sample shows you how to integrate with Seel Return Assurance(RA) service on checkout page.

## Integration Guide

### 1. **Include SDK**

```jsx
<script src="https://cdn.seel.com/sdk/sandbox/marketplace-embedded.min.js"></script>
```

Access the APIs through the global object window, taking care to use the `SeelSDK` namespace.

```jsx
const { Events, seelSDK } = window.SeelSDK || {};
const { createQuote, createOrder } = seelSDK || {};
```

### 2. Provide the host element.

Add an element to the page template and set the ID to `seel-ra-widget-root` as an anchor for the RA component.

```html
<div id="seel-ra-widget-root"></div>
```

### 3. Set up listeners for widget events.

Display the price of RA in the billing details based on the user's selection, and update the total price accordingly.

```jsx
const { Events } = window.SeelSDK || {};

document.addEventListener(Events.checked, (event) => {
  /*
	When the user selects the RA box, retrieve the checked status and quote data from the event.detail object.
	The structure of event.detail is as follows:
	{
		price,
		checked,
		quoteId,
		total,
		extraInfo
	}
	At this stage, you can add an RA line to the order and update the total accordingly.
  */
});
document.addEventListener(Events.unchecked, (event) => {
  /*
	When the user marks the RA as unchecked, retrieve the checked status and quote data from event.detail.
	The structure of event.detail is as follows:
	{
		price,
		checked,
		quoteId,
		total,
		extraInfo
	}
	At this stage, you can remove the RA line and update the total accordingly.
  */
});
```

### 4. Create a quote from cart data.

If the current item in the shopping cart is insurable and has a successful quote result, the RA component will be automatically inserted into the container provided in step 2.

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

### 5. Create order.

After successfully submitting the current order, call the createOrder API.

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

[live demo](https://page.seel.com/marketplace/return-assurance-sample/index.html)

## Run Sample Locally

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
