import Foundation
import SiteKit

/// Renders the Mailjet-backed newsletter signup card. Standalone so any page
/// renderer can drop it in by calling `NewsletterForm.render(section)` with a
/// `NewsletterSection` from `Content/Data/Landing.yaml` (or any equivalent
/// data source). The form's submit handler is wired by `Theme/js/theme.js`
/// via the `.newsletter-form` selector.
enum NewsletterForm {
   static func render(_ newsletter: NewsletterSection) -> String {
      let subtitle = newsletter.subtitle.map { "<p class=\"newsletter-subtitle\">\($0.htmlEscaped)</p>" } ?? ""
      let consent = newsletter.consent.map { "<p class=\"newsletter-consent\">\($0.htmlEscaped)</p>" } ?? ""
      let endpoint = newsletter.endpoint ?? ""
      let listID = newsletter.listID ?? ""
      let envelopeIcon = #"<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>"#
      return """
      <section id="newsletter" class="newsletter">
         <div class="newsletter-container">
            <div class="newsletter-card">
               <div class="newsletter-icon" aria-hidden="true">\(envelopeIcon)</div>
               <h2 class="newsletter-title">\(newsletter.title.htmlEscaped)</h2>
               \(subtitle)
               <form class="newsletter-form"
                     data-endpoint="\(endpoint)"
                     data-list-id="\(listID)"
                     data-success="\(newsletter.successText.htmlEscaped)"
                     data-error="\(newsletter.errorText.htmlEscaped)"
                     novalidate>
                  <label for="newsletter-email" class="sr-only">\(newsletter.placeholder.htmlEscaped)</label>
                  <input id="newsletter-email" type="email" name="email" required
                         placeholder="\(newsletter.placeholder.htmlEscaped)"
                         autocomplete="email" inputmode="email"/>
                  <button type="submit" class="landing-cta-button">\(newsletter.buttonText.htmlEscaped)</button>
                  <p class="newsletter-status" role="status" aria-live="polite"></p>
               </form>
               \(consent)
            </div>
         </div>
      </section>
      """
   }
}
