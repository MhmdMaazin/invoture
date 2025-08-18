# Requirements Document

## Introduction

This feature adds 5 new professional invoice templates to the existing Invoify system. The new templates (Template 3-7) will provide users with more design options while maintaining full compatibility with all existing functionality including PDF generation, email sending, live preview, export options, and signature support.

## Requirements

### Requirement 1

**User Story:** As a user, I want to select from 7 different invoice templates (including the existing 2), so that I can choose a design that best fits my brand and business needs.

#### Acceptance Criteria

1. WHEN the user opens the template selector THEN the system SHALL display all 7 templates with preview images
2. WHEN the user clicks on any template preview image THEN the system SHALL select that template and update the live preview
3. WHEN the user clicks the "Select" button for any template THEN the system SHALL set that template as active
4. WHEN a template is selected THEN the system SHALL show a check mark indicator on the selected template
5. WHEN the user switches between templates THEN the live preview SHALL update immediately to show the new template design

### Requirement 2

**User Story:** As a user, I want the new templates to work with all existing invoice data fields, so that I can use any template without losing functionality.

#### Acceptance Criteria

1. WHEN using any new template THEN the system SHALL display all sender information (name, address, email, phone, custom inputs)
2. WHEN using any new template THEN the system SHALL display all receiver information (name, address, email, phone, custom inputs)
3. WHEN using any new template THEN the system SHALL display all invoice details (number, dates, currency, items, totals)
4. WHEN using any new template THEN the system SHALL display payment information, tax details, discount details, and shipping details when provided
5. WHEN using any new template THEN the system SHALL display additional notes and payment terms
6. WHEN using any new template THEN the system SHALL support logo display when provided

### Requirement 3

**User Story:** As a user, I want signature functionality to work with all new templates, so that I can add my signature regardless of which template I choose.

#### Acceptance Criteria

1. WHEN a signature is added via drawing THEN all new templates SHALL display the signature image correctly
2. WHEN a signature is added via typing THEN all new templates SHALL display the typed signature with the selected font
3. WHEN a signature is uploaded as an image THEN all new templates SHALL display the uploaded signature
4. WHEN no signature is provided THEN all new templates SHALL not show any signature section

### Requirement 4

**User Story:** As a user, I want PDF generation to work with all new templates, so that I can download and share invoices in any template design.

#### Acceptance Criteria

1. WHEN generating a PDF with any new template THEN the system SHALL create a PDF that matches the template design exactly
2. WHEN generating a PDF with any new template THEN all data fields SHALL be populated correctly
3. WHEN generating a PDF with any new template THEN the styling and colors SHALL match the template preview
4. WHEN generating a PDF with any new template THEN the layout SHALL be properly formatted for printing

### Requirement 5

**User Story:** As a user, I want all export and sharing features to work with new templates, so that I can use the same workflow regardless of template choice.

#### Acceptance Criteria

1. WHEN using any new template THEN the email sending functionality SHALL work correctly
2. WHEN using any new template THEN the print functionality SHALL work correctly
3. WHEN using any new template THEN all export formats (JSON, CSV, XML, XLSX) SHALL work correctly
4. WHEN using any new template THEN the save/load functionality SHALL preserve the template selection
5. WHEN using any new template THEN the preview in new tab functionality SHALL work correctly

### Requirement 6

**User Story:** As a user, I want the new templates to be accessible via direct URLs, so that I can preview individual templates.

#### Acceptance Criteria

1. WHEN accessing `/template/3` THEN the system SHALL display Template 3 with sample data
2. WHEN accessing `/template/4` THEN the system SHALL display Template 4 with sample data
3. WHEN accessing `/template/5` THEN the system SHALL display Template 5 with sample data
4. WHEN accessing `/template/6` THEN the system SHALL display Template 6 with sample data
5. WHEN accessing `/template/7` THEN the system SHALL display Template 7 with sample data

### Requirement 7

**User Story:** As a developer, I want the new templates to follow the existing code patterns, so that the system remains maintainable and consistent.

#### Acceptance Criteria

1. WHEN implementing new templates THEN each template SHALL use the InvoiceLayout wrapper component
2. WHEN implementing new templates THEN each template SHALL accept the same InvoiceType props as existing templates
3. WHEN implementing new templates THEN each template SHALL be dynamically importable by the existing template loading system
4. WHEN implementing new templates THEN each template SHALL handle all optional fields gracefully (logo, signature, payment info, etc.)
5. WHEN implementing new templates THEN the template selector SHALL be updated to include all new templates with proper preview images

### Requirement 8

**User Story:** As a user, I want Template 5's geometric elements to have curved edges instead of sharp angles, so that the design appears more modern and visually appealing.

#### Acceptance Criteria

1. WHEN viewing Template 5 THEN the top geometric header element SHALL use curved edges instead of sharp triangular borders
2. WHEN viewing Template 5 THEN the curved element SHALL maintain the same color scheme (gray-700)
3. WHEN viewing Template 5 THEN the curved element SHALL maintain proper positioning and sizing
4. WHEN generating a PDF with Template 5 THEN the curved elements SHALL render correctly in the PDF output