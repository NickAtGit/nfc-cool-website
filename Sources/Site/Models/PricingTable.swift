import Foundation

/// A generic, N-column comparison/pricing table. Backs both the feature-page
/// "Free vs Platinum" tables (`Content/Data/Features/{slug}.yaml`) and the
/// business-card plan-comparison table (`Content/Data/Pricing/business-card.yaml`).
///
/// Rendered by `PricingTableRenderer`.
struct PricingTable: Decodable, Sendable {
   /// Optional section heading. Feature pages render it as the `<h2>` above the
   /// table; pages that supply their own heading (e.g. the business-card page)
   /// leave it `nil`.
   let title: String?
   /// Column headers, left to right (e.g. `["Free", "Platinum"]`). The table's
   /// top-left corner cell is always blank and is not part of this list.
   let columns: [String]
   let rows: [PricingTableRow]
}

/// One row of a `PricingTable`: a row label plus one value per column.
struct PricingTableRow: Decodable, Sendable {
   /// Row header, rendered as `<th scope="row">`.
   let label: String
   /// Cell values, one per `PricingTable.columns` entry, in the same order.
   /// Each is interpreted by `PricingTableRenderer.markCell`
   /// (`✓` / `✗` / `limited` / `-` / `**bold**` / plain text).
   let values: [String]
}
