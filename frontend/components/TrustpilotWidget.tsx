'use client';

import { useEffect } from 'react';

export default function TrustpilotWidget() {
  useEffect(() => {
    // Wait for Trustpilot to be available
    const initTrustpilot = () => {
      if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(document.getElementById('trustbox'));
      } else {
        setTimeout(initTrustpilot, 100);
      }
    };

    initTrustpilot();
  }, []);

  return (
    <div
      id="trustbox"
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6771aa4f775a7e4dc3a6b1dd"
      data-style-height="52px"
      data-style-width="100%"
      data-theme="light"
    >
      <a
        href="https://www.trustpilot.com/review/saas-boilerplate-starters.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
} 