import {
  SkeletonPage,
  Layout,
  LegacyCard,
  Grid,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  SkeletonTabs,
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import 'normalize.css';
import './checkout.css';

/**
 * Import the SDK
 * The SDK for Seel has already been loaded into the public/checkout.html template file
 * using a script tag. The SDK can also be imported using alternative methods,
 * but it's crucial to ensure proper timing of loading and calling.
 */

function Chcekout() {
  const [seelSP, setSeelSP] = useState({});
  const [inssuranceFee, setInssuranceFee] = useState(0);

  /**
   * Access the APIs using the global object window,
   * making sure to utilize the SeelSDK namespace.
   */
  const { Events, seelSDK } = window.SeelSDK || {};
  const { createQuote, createOrder } = seelSDK || {};

  useEffect(() => {
    /**
     * Update the billing details to display the price of assurance products based on the user's selection,
     * and adjust the total price accordingly.
     */
    document.addEventListener(Events.checked, (event) => {
      /**
       * When the user selects the assurance box, retrieve the checked status and quote data from the event.detail object.
       * The structure of event.detail is as follows:
       * {
       *   price,
       *   checked,
       *   quoteId,
       *   total,
       *   extraInfo
       * }
       * At this stage, you can add an assurance line to the order and update the total accordingly.
       */
      const { price, checked } = event?.detail || {};
      setSeelSP({ checked, price });
      setInssuranceFee(checked ? price : 0)
    });
    document.addEventListener(Events.unchecked, (event) => {
      /**
       * When the user marks the assurance as unchecked, retrieve the checked status and quote data from event.detail.
       * The structure of event.detail is as follows:
       * {
       *   price,
       *   checked,
       *   quoteId,
       *   total,
       *   extraInfo
       * }
       * At this stage, you can remove the assurance line and update the total accordingly.
       */
      const { price, checked } = event?.detail || {};
      setSeelSP({ checked, price });
      setInssuranceFee(checked ? price : 0)
    });
  }, []);

  useEffect(() => {
    /**
     * Create a quote when the quote parameters are ready.
     * The assurance component will be automatically inserted into the anchor element (seel-ra-widget-root).
     * 
     * The quote parameters are as follows. Note that this quote_param is for demo purposes only,
     * and the createQuote function returns a mock response. For more details, please refer to our
     * developer documentation at: https://developer.seel.com/reference/createquote. We recommend
     * using server-side implementation of createQuote for security purposes.
     */
    const quote_param = {
      "line_items": [
        {
          "line_item_id": "123",
          "price": 62.40
        }
      ]
    };
    createQuote({ quote_param });
  }, []);

  const submitOrder = async (ev) => {
    /**
     * When the user clicks on "Submit Order" and the order is successfully created, call the createOrder 
     * function.
     * 
     * The order parameters are as follows. Note that this order_param is for demo purposes only,
     * and the createOrder function returns a mock response. For more details, please refer to our
     * developer documentation at: https://developer.seel.com/reference/createorder. We recommend
     * using server-side implementation of createOrder for security purposes.
     */
    const order_param = {
      "line_items": [
        {
          "line_item_id": "123",
          "price": 62.40
        }
      ],
      "order_id": "12345"
    };
    const resp = await createOrder({ order_param });
    console.log(resp);
  };

  return (
    <SkeletonPage title="Checkout" primaryAction>
      <Layout>
        <Layout.Section>
          <LegacyCard>
            <SkeletonTabs count={3} />
          </LegacyCard>
          <LegacyCard sectioned title="Ship To">
            <Grid columns={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
              <Grid.Cell>
                <TextContainer>
                  <SkeletonDisplayText size="large" />
                  <SkeletonBodyText lines={2} />
                </TextContainer>
              </Grid.Cell>
              <Grid.Cell>
                <TextContainer>
                  <SkeletonDisplayText size="large" />
                  <SkeletonBodyText lines={1} />
                </TextContainer>
              </Grid.Cell>
              <Grid.Cell>
                <TextContainer>
                  <SkeletonDisplayText size="large" />
                  <SkeletonBodyText lines={2} />
                </TextContainer>
              </Grid.Cell>
              <Grid.Cell>
                <TextContainer>
                  <SkeletonDisplayText size="large" />
                  <SkeletonBodyText lines={3} />
                </TextContainer>
              </Grid.Cell>
              <Grid.Cell>
                <TextContainer>
                  <SkeletonDisplayText size="large" />
                  <SkeletonBodyText lines={3} />
                </TextContainer>
              </Grid.Cell>
              <Grid.Cell>
                <TextContainer>
                  <SkeletonDisplayText size="large" />
                  <SkeletonBodyText lines={2} />
                </TextContainer>
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          {/* 
            An anchor for the assurance component will be automatically inserted 
            when the quote API response is successful. 
          */}
          <div id="seel-sp-widget-root"></div>
          <LegacyCard sectioned title="Payment card details">
            <Grid columns={{ xs: 5, sm: 5, md: 5, lg: 5, xl: 5 }}>
              <Grid.Cell>
                <SkeletonDisplayText size="extraLarge" />
              </Grid.Cell>
              <Grid.Cell>
                <SkeletonDisplayText size="extraLarge" />
              </Grid.Cell>
              <Grid.Cell>
                <SkeletonDisplayText size="extraLarge" />
              </Grid.Cell>
            </Grid>
          </LegacyCard>
          <div className="submit-order" onClick={submitOrder}>
            {'SUBMIT ORDER'}
          </div>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard title="Items">
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={3} />
              </TextContainer>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </LegacyCard.Section>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={3} />
              </TextContainer>
            </LegacyCard.Section>
            <div className="items price-line">
              <div className="price-line-title">Items:</div>
              <div>$217.60</div>
            </div>
            <div className="shipping price-line">
              <div className="price-line-title">Shipping:</div>
              <div>$5.00</div>
            </div>
            {/* 
              Update assurance price and total price when the user checks the assurance component.
            */}
            {seelSP.checked && seelSP.price ? (
              <div className="seel-ra price-line">
                <div className="price-line-title">Shipping Protection:</div>
                <div>{`$${seelSP.price}`}</div>
              </div>
            ) : null}
            <div className="total price-line">
              <div className="price-line-title">Total:</div>
              <div className="price-total">{`$${(217.60 + 5 + inssuranceFee).toFixed(2)}`}</div>
            </div>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default Chcekout;
