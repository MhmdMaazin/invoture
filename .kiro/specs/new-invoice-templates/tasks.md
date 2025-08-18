# Implementation Plan

- [x] 1. Create Template 3 - Red Sidebar Design
  - Create InvoiceTemplate3.tsx component with red sidebar layout
  - Implement sender info in red sidebar section
  - Create dark navy items table section
  - Add payment info and totals in sidebar
  - Include signature support and responsive design
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4_

- [x] 2. Create Template 4 - Colorful Circles Design
  - Create InvoiceTemplate4.tsx component with colorful header design
  - Implement overlapping circles brand element
  - Create yellow/dark table headers for items
  - Add colorful border elements throughout design
  - Include all invoice data fields and signature support
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4_

- [x] 3. Create Template 5 - Geometric Red Design
  - Create InvoiceTemplate5.tsx component with angular geometric design
  - Implement diagonal red design elements
  - Create clean minimalist layout for invoice data
  - Add geometric shapes and modern styling
  - Include signature support and responsive behavior
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4_

- [x] 4. Create Template 6 - Blue Corporate Design
  - Create InvoiceTemplate6.tsx component with professional blue design
  - Implement structured corporate layout sections
  - Create blue accent headers and formal styling
  - Add gradient signature area and professional appearance
  - Include all invoice fields and payment information
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4_

- [x] 5. Create Template 7 - Minimalist Gray Design
  - Create InvoiceTemplate7.tsx component with clean minimal design
  - Implement subtle gray accents and generous whitespace
  - Create simple typography and minimal color usage
  - Add professional appearance with clean sections
  - Include signature support and all data fields
  - _Requirements: 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4_

- [x] 6. Create template preview images
  - Generate template3.png preview image for Template 3
  - Generate template4.png preview image for Template 4
  - Generate template5.png preview image for Template 5
  - Generate template6.png preview image for Template 6
  - Generate template7.png preview image for Template 7
  - Save all images to public/assets/img/ directory
  - _Requirements: 1.1, 1.4_

- [x] 7. Update TemplateSelector component
  - Import all new template components (InvoiceTemplate3-7)
  - Import all new template preview images
  - Add 5 new template entries to templates array with correct metadata
  - Ensure template selection logic works for templates 3-7
  - Test template switching and preview updates
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 8. Update component exports
  - Add InvoiceTemplate3 export to main components index
  - Add InvoiceTemplate4 export to main components index
  - Add InvoiceTemplate5 export to main components index
  - Add InvoiceTemplate6 export to main components index
  - Add InvoiceTemplate7 export to main components index
  - Verify all exports are properly configured
  - _Requirements: 7.3_

- [ ] 9. Test PDF generation functionality
  - Test PDF generation with Template 3 using sample invoice data
  - Test PDF generation with Template 4 using sample invoice data
  - Test PDF generation with Template 5 using sample invoice data
  - Test PDF generation with Template 6 using sample invoice data
  - Test PDF generation with Template 7 using sample invoice data
  - Verify PDF output matches template design and includes all data fields
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 10. Test signature functionality across all new templates
  - Test drawn signature display in Templates 3-7
  - Test typed signature with custom fonts in Templates 3-7
  - Test uploaded signature image display in Templates 3-7
  - Verify signature positioning and styling in each template
  - Test templates with no signature provided
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 11. Test template routing and preview functionality
  - Test direct access to /template/3 route with sample data
  - Test direct access to /template/4 route with sample data
  - Test direct access to /template/5 route with sample data
  - Test direct access to /template/6 route with sample data
  - Test direct access to /template/7 route with sample data
  - Verify each route displays correct template with proper styling
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 12. Test all export and sharing features
  - Test email sending functionality with each new template
  - Test print functionality with each new template
  - Test JSON export with templates 3-7 selected
  - Test CSV export with templates 3-7 selected
  - Test XML export with templates 3-7 selected
  - Test XLSX export with templates 3-7 selected
  - Test save/load functionality preserves template selection
  - Test preview in new tab functionality for all new templates
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 13. Verify responsive design and cross-browser compatibility
  - Test all new templates on mobile devices (responsive design)
  - Test all new templates on tablet devices
  - Test all new templates on desktop screens
  - Test templates in Chrome, Firefox, Safari, and Edge browsers
  - Verify print layouts work correctly across browsers
  - _Requirements: 4.4, 7.4_

- [ ] 14. Test error handling and edge cases
  - Test templates with missing optional fields (logo, signature, payment info)
  - Test templates with very long text content
  - Test templates with special characters and international text
  - Test template switching with unsaved changes
  - Verify graceful fallback when template loading fails
  - _Requirements: 7.4_

- [ ] 15. Enhance Template 5 with curved geometric elements
  - Replace triangular border elements with curved CSS shapes using clip-path or border-radius
  - Update the top header geometric element to use smooth curves instead of sharp angles
  - Maintain the same gray-700 color scheme and positioning
  - Test curved elements render correctly in both preview and PDF generation
  - Verify responsive behavior of curved elements across different screen sizes
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 16. Final integration testing
  - Test complete invoice creation workflow using each new template
  - Verify template selection persists through save/load cycles
  - Test switching between all 7 templates in single session
  - Verify live preview updates correctly when switching templates
  - Test all templates with real-world invoice data scenarios
  - _Requirements: 1.5, 5.4, 7.1, 7.2_