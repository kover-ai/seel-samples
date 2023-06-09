import {
  SkeletonPage,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  SkeletonTabs
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import 'normalize.css';
import './checkout.css';

/**
 * include SDK
 * Seel SDK has already been loaded into the public/checkout.html template file 
 * via the script tag. The SDK can also be imported using other methods,
 * but it is important to pay attention to the timing of loading and calling.
 */

function Chcekout() {
  const [seelRA, setSeelRA] = useState({});
  const [total, setTotal] = useState(67.4);

  /**
   * Access the APIs through the global object window, 
   * taking care to use the SeelSDK namespace.
   */
  const { Events, seelSDK } = window.SeelSDK || {};
  const { createQuote, placeOrder } = seelSDK || {};

  useEffect(() => {
    /**
     * Display the price of insurance products in the billing details based on the user's selection, 
     * and update the total price accordingly.
     */
    document.addEventListener(Events.checked, (event) => {
      /**
       *  When the user checks the assurance box, you can obtain 
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
      const { price } = event?.detail || {};
      setSeelRA({ checked: true, price });
      setTotal((total + price).toFixed(2));
    });
    document.addEventListener(Events.unchecked, (event) => {
      /**
       *  When the user sets the assurance as checked, you can retrieve
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
      const { price } = event?.detail || {};
      setSeelRA({ checked: false });
      setTotal(total - price);
    });
  }, []);

  useEffect(() => {
    /**
     * create quote when quote params are ready,
     * the insurance component will be automatically inserted into the anchor element (seel-ra-widget-root)
     */

    // quote params, `mock_success` is reserved title for success quote creation
    const items = [
      {
        product_url: 'url',
        quantity: 1,
        price: 34.33,
        title: 'mock_success',
      },
    ];
    createQuote({ items });
  }, []);

  const submitOrder = async (ev) => {
    /**
     * When the user clicks on "Submit Order", if the order is successful, 
     * use the order number as a parameter to call the placeorder API.
     */

    placeOrder('order_1234')
  };

  return (
    <SkeletonPage title="Chcekout" primaryAction>
      <Layout>
        <Layout.Section>
          <LegacyCard>
            <SkeletonTabs count={3} />
          </LegacyCard>
          <LegacyCard sectioned title="Ship To">
            <TextContainer>
              <SkeletonDisplayText size="medium" />
              <SkeletonBodyText lines={2} />
              <SkeletonDisplayText size="medium" />
              <SkeletonBodyText lines={5} />
            </TextContainer>
          </LegacyCard>
          {/* 
            An anchor for the insurance component will be automatically inserted 
            when the quote API response is successful. 
          */}
          <div id="seel-ra-widget-root"></div>
          <LegacyCard sectioned title="Payment card details">
            <TextContainer>
              <SkeletonDisplayText size="extraLarge" />
              <SkeletonBodyText lines={1} />
            </TextContainer>
          </LegacyCard>
          <LegacyCard sectioned>
            <SkeletonBodyText lines={2} />
          </LegacyCard>
          <div className="submit-order" onClick={submitOrder}>
            {'SUBMIT ORDER'}
          </div>
        </Layout.Section>
        <Layout.Section secondary>
          <LegacyCard title="Items">
            <LegacyCard.Section className="item-line">
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
              <div>$62.40</div>
            </div>
            <div className="shipping price-line">
              <div className="price-line-title">Shipping:</div>
              <div>$5.00</div>
            </div>
            {/* 
              Update assurance price and total price when the user checks the assurance component.
            */}
            {seelRA.checked && seelRA.price ? (
              <div className="seel-ra price-line">
                <div className="price-line-title">Return Assurance:</div>
                <div>{`$${seelRA.price}`}</div>
              </div>
            ) : null}
            <div className="total price-line">
              <div className="price-line-title">Total:</div>
              <div className="price-total">{`$${total}`}</div>
            </div>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}

export default Chcekout;
