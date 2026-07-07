# iSmartPay Update Notes

This folder contains logs of all changes made to the platform. 
The `release-notes.json` file is used by the application to show update notifications to users.

## [Latest] - 2026-05-05

### Added
- **Verification UI**: Added Level 0 (Basic Account) cards to both Business and Individual verification pages to clearly show the starting status.
- **Tour Integration**: Integrated `data-tour` markers for the Business Settings "Danger Zone", Utilities page headers, and Verification level cards.

### Fixed
- **Dark Mode Autofill**: Fixed an issue where browser autofill (Chrome/Safari) would force a white background on input fields in dark mode.
- **Global Input Styles**: Standardized input, textarea, and select behavior across the app using CSS variables and `!important` overrides for browser agents.

### Changed
- **Verification Progress**: Updated the `VerificationProgressGuide` to include Level 0 in the journey journey visualization and corrected transaction limits.
- **Project Structure**: Moved release notes from `public/` to `public/UPDATENOTE/` for better organization and developer discoverability.

---

## [Previous]

### Added
- Initial project structure.
- Core authentication flows.
- Utility payment integrations.
- Dashboard analytics.
