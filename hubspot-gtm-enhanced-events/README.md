# HubSpot GTM Enhanced Events

A portable Google Tag Manager module that upgrades HubSpot’s tracking accuracy across forms, chat, meetings, CTAs, and attribution.

## What it does

This module listens for HubSpot UI interactions and pushes clean events into the dataLayer (or any custom handler):

- `hubspot_form_view`
- `hubspot_form_submitted`
- `hubspot_meeting_booked`
- `hubspot_chat_started`
- `hubspot_chat_converted`
- `hubspot_cta_click`

Each event includes:

- Page context: URL, title, UTM params, session ID
- Visitor context: HubSpot Visitor ID (`hubspotutk` cookie)

## Intended pipelines

- GTM → GA4 events
- GTM → server-side GTM → CRM / warehouse
- Custom endpoints (webhooks, event buses)

## GTM usage (high-level)

1. Add the compiled JS snippet as a **Custom HTML Tag** or use the GTM Template in `/gtm`.
2. Fire it on **All Pages**.
3. Create GA4 Event tags that listen for the `event` names above (`hubspot_form_submitted`, etc.).
4. Map parameters to GA4 event parameters (`form_id`, `form_name`, `hs_meeting_link`, etc.).

See `/docs` and `/examples` for implementation details.
