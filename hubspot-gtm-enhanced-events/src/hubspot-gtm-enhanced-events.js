/**
 * HubSpot GTM Enhanced Events
 *
 * Lightweight browser script intended to run inside GTM (Custom HTML tag).
 * Listens for HubSpot forms, meetings, chat, and CTAs, then pushes normalized
 * events into dataLayer.
 */

(function () {
  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  function getHubSpotUTK() {
    const match = document.cookie.match(/hubspotutk=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  function getPageContext() {
    const url = new URL(window.location.href);
    const params = Object.fromEntries(url.searchParams.entries());

    return {
      url: url.href,
      path: url.pathname,
      title: document.title || null,
      utm_source: params.utm_source || null,
      utm_medium: params.utm_medium || null,
      utm_campaign: params.utm_campaign || null,
      utm_term: params.utm_term || null,
      utm_content: params.utm_content || null,
      // Replace these with your actual session ID logic if available
      session_id: window.gaSessionId || window.gtagSessionId || null,
      hubspotutk: getHubSpotUTK()
    };
  }

  function pushEvent(eventName, extra) {
    var ctx = getPageContext();
    var payload = Object.assign(
      {
        event: eventName,
        hubspot_event: eventName,
        hubspotutk: ctx.hubspotutk,
        page_url: ctx.url,
        page_path: ctx.path,
        page_title: ctx.title,
        utm_source: ctx.utm_source,
        utm_medium: ctx.utm_medium,
        utm_campaign: ctx.utm_campaign,
        utm_term: ctx.utm_term,
        utm_content: ctx.utm_content,
        session_id: ctx.session_id
      },
      extra || {}
    );

    window.dataLayer.push(payload);
  }

  /**
   * Expose global hooks that GTM / site code can call.
   */
  window.HubSpotGTMEnhancedEvents = window.HubSpotGTMEnhancedEvents || {};

  /**
   * HUBSPOT FORMS
   * - Embedded forms (using hbspt.forms.create callbacks)
   * - Popup forms (often also use the forms API under the hood)
   *
   * These hooks are intended to be called from HubSpot form callbacks:
   *   onFormReady -> onFormView
   *   onFormSubmit -> onFormSubmitted
   */

  // Called when a HubSpot form is rendered
  window.HubSpotGTMEnhancedEvents.onFormView = function (meta) {
    pushEvent("hubspot_form_view", {
      form_id: meta && meta.formId,
      form_name: meta && meta.formName,
      portal_id: meta && meta.portalId,
      form_target: meta && meta.target
    });
  };

  // Called when a HubSpot form is submitted
  window.HubSpotGTMEnhancedEvents.onFormSubmitted = function (meta) {
    pushEvent("hubspot_form_submitted", {
      form_id: meta && meta.formId,
      form_name: meta && meta.formName,
      portal_id: meta && meta.portalId,
      form_target: meta && meta.target,
      lead_lifecycle_stage: meta && meta.lifecycleStage,
      hs_context: meta && meta.hsContext // optional debug blob
    });
  };

  /**
   * HUBSPOT MEETINGS
   * Typically listens to postMessage or callback hooks from the meetings widget.
   * This is the normalization layer that GTM or site scripts can call into.
   */
  window.HubSpotGTMEnhancedEvents.onMeetingBooked = function (meta) {
    pushEvent("hubspot_meeting_booked", {
      meeting_link: meta && meta.meetingLink,
      meeting_title: meta && meta.meetingTitle,
      meeting_owner: meta && meta.ownerEmail
    });
  };

  /**
   * HUBSPOT CHAT
   * These can be wired to HubSpot Conversations API events.
   */
  window.HubSpotGTMEnhancedEvents.onChatStarted = function (meta) {
    pushEvent("hubspot_chat_started", {
      chat_channel: meta && meta.channel,
      chat_thread_id: meta && meta.threadId
    });
  };

  window.HubSpotGTMEnhancedEvents.onChatConverted = function (meta) {
    pushEvent("hubspot_chat_converted", {
      chat_channel: meta && meta.channel,
      chat_thread_id: meta && meta.threadId,
      conversion_type: meta && meta.conversionType
    });
  };

  /**
   * HUBSPOT CTAs
   * Use GTM click triggers (or direct handlers) and call this hook with
   * relevant CTA metadata.
   */
  window.HubSpotGTMEnhancedEvents.onCtaClick = function (meta) {
    pushEvent("hubspot_cta_click", {
      cta_id: meta && meta.ctaId,
      cta_label: meta && meta.label,
      cta_url: meta && meta.url
    });
  };

  // Optional: basic debug flag via query param
  if (window.location.search.indexOf("hsGtmDebug=1") !== -1) {
    console.log(
      "[HubSpotGTMEnhancedEvents] initialized with page context:",
      getPageContext()
    );
  }
})();