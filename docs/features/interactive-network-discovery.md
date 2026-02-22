# Feature Requirement Document: Interactive Network Discovery Landing Page

## Feature Name
Interactive Network Discovery Landing Page

## Goal
To improve information readability and user engagement by replacing the current text-heavy, linear scroll experience with an interactive, graph-based discovery interface. This will allow users to consume "small pieces of info" incrementally, as requested.

## User Story
As a potential user or investor, I want to explore CloudToTerra's mission, typologies, and pilot projects through an interactive network of connected nodes, so that I don't feel overwhelmed by large blocks of text and can discover information at my own pace.

## Functional Requirements
1.  **Graph-Based Visualization**: Implement a central interactive graph where nodes represent key concepts (e.g., "Three Signal Types", "Buffalo, NY", "No Gatekeepers").
2.  **Incremental Information Reveal**:
    -   Initial view shows only the core "CloudToTerra" node or a high-level summary.
    -   Clicking or scrolling to a node "unlocks" or reveals its sub-nodes and associated text.
    -   Text should be displayed in small, manageable blocks (e.g., tooltips, side panels, or expanding nodes).
3.  **Visual Language (Reference Style)**:
    -   Use different shapes for different node categories (e.g., Circles for Societies, Diamonds for Assets, Triangles for Facilities).
    -   Use colors consistently with the existing brand (Cyan for Society, Orange for Asset, Purple for Facility, Green for Protocol).
    -   Include a Legend similar to the reference image provided by the user.
4.  **Connected Information**: Use edges (lines) to show relationships between nodes (e.g., how "Society" and "Asset" connect to the "Buffalo" pilot).
5.  **Interactive Exploration**: Users can drag the graph, zoom, and click nodes to dive deeper.
6.  **Responsive Layout**: The graph must adapt to mobile screens, perhaps switching to a simplified list-reveal view if the graph is too complex.

## Data Requirements
-   Existing data from `src/app/page.tsx` ( `TYPOLOGIES`, `STEPS`, `BUFFALO_STATS`) will be restructured into a graph data format (nodes and edges).
-   Node Types: `Hub`, `Category`, `Detail`, `Location`.

## User Flow
1.  **Entry**: User arrives at the landing page and sees a high-tech "boot sequence" leading to a central node: **CLOUD TO TERRA**.
2.  **Interaction**: User clicks the central node. It pulses and branches out to three main nodes: **Society**, **Asset**, and **Facility**.
3.  **Discovery**:
    -   User clicks **Society**. A small block of text appears explaining "Active communities...".
    -   As the user scrolls down, the graph shifts focus to the **Buffalo, NY** node, revealing its local zones and stats.
4.  **Completion**: User reaches the final node **Open Protocol / No Gatekeepers** with a clear CTA to "Open the Map".

## Acceptance Criteria
-   Information is broken into chunks of no more than 2-3 sentences per reveal.
-   The graph visualization is performant (60fps animations).
-   Interactive elements (hover, click) provide immediate visual feedback.
-   The design matches the "Intelligence Classification" aesthetic (dark theme, glow effects, mono fonts).
-   All core information from the original landing page is preserved but reorganized.

## Edge Cases
-   **No JS**: Fallback to a simplified version of the current linear scroll page.
-   **Small Screens**: Nodes should not overlap or become unclickable; zoom/pan should be intuitive on touch.
-   **Accessibility**: All information must be accessible via keyboard navigation and screen readers (e.g., using hidden ARIA descriptions or a side-list fallback).

## Non-Functional Requirements
-   **Performance**: Minimize the bundle size if using a graph library (e.g., consider lightweight alternatives like `react-force-graph` or custom SVG logic).
-   **Maintainability**: Node data should be stored in a separate configuration file for easy updates.
