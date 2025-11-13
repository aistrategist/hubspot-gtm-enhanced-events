<div align="center">

# ⚡ HubSpot GTM Enhanced Events  
### A portable GTM module for enterprise-grade HubSpot event tracking

<img src="https://img.shields.io/badge/Platform-GTM-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/HubSpot-Optimized-ff7a59?style=for-the-badge" />
<img src="https://img.shields.io/badge/GA4-Event%20Ready-5f9ea0?style=for-the-badge" />
<img src="https://img.shields.io/badge/Maintained-Yes-brightgreen?style=for-the-badge" />

<br><br>

**Full attribution. Clean data. One portable script.**  
Stop relying on HubSpot’s limited pixel and get enterprise-grade analytics —  
directly through Google Tag Manager.

</div>

---

## 🚀 What This Module Does

This script normalizes HubSpot interactions into clean analytics events and pushes them into the `dataLayer`.

It reliably tracks:

### 🧩 **Forms**
- `hubspot_form_view`
- `hubspot_form_submitted`

### 📅 **Meetings**
- `hubspot_meeting_booked`

### 💬 **Chat**
- `hubspot_chat_started`
- `hubspot_chat_converted`

### 🔘 **CTAs**
- `hubspot_cta_click`

All events are delivered with:

| Category | Included Fields |
|---------|-----------------|
| **Page Context** | URL, path, title, session ID, UTM params |
| **Visitor Context** | HubSpot visitor ID (`hubspotutk`) |
| **Event Metadata** | Form IDs, Meeting details, CTA details, Chat details |

---

## 🎯 Why This Exists

HubSpot’s native tracking:
- ❌ Not reliable for GA4  
- ❌ Fails on embedded forms  
- ❌ Breaks inside SPAs  
- ❌ Loses attribution  
- ❌ Missing form-level detail  
- ❌ Does not consistently capture meetings or chat

**This module fixes all of that — instantly.**

**Perfect for:**
- Agencies  
- Enterprise analytics  
- CRO teams  
- Advanced GTM setups  
- Server-side GTM  
- Multi-site rollouts  

---

## 🛠️ Getting Started

### 1. Add this script to GTM  
Create a **Custom HTML Tag → All Pages** and paste:

<script src="PATH_TO_YOUR_SCRIPT/hubspot-gtm-enhanced-events.js"></script>
sql
Copy code

Or copy the full script from `/src/hubspot-gtm-enhanced-events.js`.

### 2. Create GA4 event triggers  
Use GTM triggers:

event equals hubspot_form_submitted
event equals hubspot_meeting_booked
event equals hubspot_cta_click
...

markdown
Copy code

### 3. Map variables to GA4  
Create Data Layer Variables for:
- `form_id`
- `form_name`
- `meeting_link`
- `cta_label`
- `hubspotutk`
- `session_id`
- `utm_medium`, etc.

### 4. (Optional) Route through Server-Side GTM  
For enterprise attribution, send events to your sGTM endpoint.

---

## 🧰 Global Hook API

### Available Methods

```js
HubSpotGTMEnhancedEvents.onFormView(meta)
HubSpotGTMEnhancedEvents.onFormSubmitted(meta)
HubSpotGTMEnhancedEvents.onMeetingBooked(meta)
HubSpotGTMEnhancedEvents.onChatStarted(meta)
HubSpotGTMEnhancedEvents.onChatConverted(meta)
HubSpotGTMEnhancedEvents.onCtaClick(meta)
Example
js
Copy code
HubSpotGTMEnhancedEvents.onFormSubmitted({
  formId: "1234-5678",
  formName: "Contact Us",
  portalId: "987654",
  target: "#hs-form-1234"
});
```
🧪 Local Testing
Try /examples/basic-ga4-integration.html.

This logs all normalized events to the console.

🖥️ Debug Mode
Append ?hsGtmDebug=1:

ruby
Copy code
https://yoursite.com/?hsGtmDebug=1
Console logs will show:

Full page context

HubSpotutk

All dataLayer pushes

📁 Project Structure
matlab
Copy code
/
├── src/
│   └── hubspot-gtm-enhanced-events.js
├── gtm/
│   └── hubspot-enhanced-events-tag.tpl.json
├── examples/
│   └── basic-ga4-integration.html
├── docs/
│   └── install-hubspot-gtm.md
└── README.md
❤️ Credits
Built for marketers, engineers, SEOs, and agencies who need real data, not guesswork.

If you improve or extend this module, PRs are always welcome.

<div align="center">
Made with ⚡ by Chris Gabriel

</div> 