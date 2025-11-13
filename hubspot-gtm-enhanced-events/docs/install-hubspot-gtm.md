# 📘 Installation Guide  
### HubSpot GTM Enhanced Events

A step-by-step walkthrough for deploying enterprise-grade HubSpot event tracking using Google Tag Manager.

---

# 1. Add the Script to GTM

## Option A — Use as Custom HTML Tag (recommended)

1. Go to GTM → **Tags → New**
2. Tag Type: **Custom HTML**
3. Paste the script from:

/src/hubspot-gtm-enhanced-events.js

yaml
Copy code

4. Trigger: **All Pages**
5. Save → Publish

---

# 2. Create Data Layer Variables

You will need these GTM variables for GA4 or server-side GTM.

### Suggested Variables

| Variable Name | Data Layer Key |
|---------------|----------------|
| `dlv_form_id` | `form_id` |
| `dlv_form_name` | `form_name` |
| `dlv_meeting_link` | `meeting_link` |
| `dlv_cta_label` | `cta_label` |
| `dlv_hubspotutk` | `hubspotutk` |
| `dlv_utm_medium` | `utm_medium` |
| `dlv_session_id` | `session_id` |

---

# 3. Create GA4 Event Tags

For each HubSpot event, create:

### Example: HubSpot Form Submitted
1. Tag Type: **GA4 Event**
2. Event Name: `hubspot_form_submitted`
3. Trigger:  
event equals hubspot_form_submitted

yaml
Copy code
4. Parameters:
| GA4 Param | Value |
|-----------|--------|
| `form_id` | `{{dlv_form_id}}` |
| `hubspotutk` | `{{dlv_hubspotutk}}` |

Repeat for:
- `hubspot_form_view`
- `hubspot_meeting_booked`
- `hubspot_chat_started`
- `hubspot_chat_converted`
- `hubspot_cta_click`

---

# 4. Capture HubSpot Forms Automatically

This module supports:
- Embedded forms  
- Popup forms  
- React/SPA environments  
- AJAX forms  

If your site uses `hbspt.forms.create`, add:

```js
onFormReady: function($form) {
HubSpotGTMEnhancedEvents.onFormView({ 
 formId: formId, 
 formName: formName,
 portalId: portalId,
 target: selector
});
},
onFormSubmit: function($form) {
HubSpotGTMEnhancedEvents.onFormSubmitted({
 formId: formId,
 formName: formName
});
}
(You can also use GTM auto-listeners.)

5. Tracking HubSpot Meetings
HubSpot Meetings widgets fire a postMessage after booking.

Example GTM listener (Custom HTML):

js
Copy code
window.addEventListener("message", function(e) {
  if (e.data.meetingBooked) {
    HubSpotGTMEnhancedEvents.onMeetingBooked({
      meetingLink: e.data.link,
      meetingTitle: e.data.title,
      ownerEmail: e.data.owner
    });
  }
});
6. Tracking HubSpot Chat
Wire HubSpot Conversations API events:

js
Copy code
window.HubSpotConversations.on('conversationStarted', function(evt) {
  HubSpotGTMEnhancedEvents.onChatStarted(evt);
});

window.HubSpotConversations.on('conversationClosed', function(evt) {
  HubSpotGTMEnhancedEvents.onChatConverted(evt);
});
7. CTA Tracking
Use GTM Click Triggers + call:

js
Copy code
HubSpotGTMEnhancedEvents.onCtaClick({
  ctaId: element.dataset.ctaId,
  label: element.innerText,
  url: element.href
});
```
8. Debug Mode
Add:

ruby
Copy code
?hsGtmDebug=1
Console will output detailed logs.

9. Server-Side GTM (Advanced)
If using sGTM, change GA4 events to send via your server container endpoint.

Creates:

Reliable attribution

Cleaner PII separation

First-party event ownership

10. Support / Customization
If you need:

Auto-detection of all HubSpot modules

Full sGTM pipelines

Event enrichment

Multi-domain attribution

CRM alignment (HubSpot → BigQuery → GA4)

You can extend this module or open an issue/PR on the repo. 