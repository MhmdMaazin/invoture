# Design Document

## Overview

This design outlines the implementation of 5 new invoice templates (Templates 3-7) for the Invoify system. Each template will have a unique visual design while maintaining full compatibility with the existing template system architecture. The templates are based on the provided design images and will integrate seamlessly with all existing functionality.

## Architecture

### Template System Architecture

The existing template system uses a dynamic import pattern that we'll extend:

```
Template Selection Flow:
User selects template → pdfTemplate field updated → DynamicInvoiceTemplate loads correct component → Template renders with invoice data
```

### Component Structure

Each new template will follow the established pattern:
- `InvoiceTemplate[N].tsx` - Main template component
- Uses `InvoiceLayout` wrapper for common functionality
- Accepts `InvoiceType` props containing all invoice data
- Implements responsive design with Tailwind CSS

## Components and Interfaces

### New Template Components

**Template 3 - Red Sidebar Design**
- File: `InvoiceTemplate3.tsx`
- Design: Red sidebar with dark navy section, clean white main area
- Key features: Vertical red brand section, dark item list area, payment info in sidebar

**Template 4 - Colorful Circles Design**
- File: `InvoiceTemplate4.tsx`
- Design: Colorful overlapping circles header, yellow/dark table headers
- Key features: Vibrant circular brand elements, alternating table colors

**Template 5 - Geometric Red Design**
- File: `InvoiceTemplate5.tsx`
- Design: Angular red geometric shapes, diagonal design elements
- Key features: Modern geometric branding, clean minimalist layout

**Template 6 - Blue Corporate Design**
- File: `InvoiceTemplate6.tsx`
- Design: Professional blue headers, structured corporate layout
- Key features: Blue accent colors, formal business appearance, clear sections

**Template 7 - Minimalist Gray Design**
- File: `InvoiceTemplate7.tsx`
- Design: Clean minimalist approach, subtle gray accents
- Key features: Simple typography, minimal color usage, professional appearance

### Updated Components

**TemplateSelector Component**
- Add 5 new template entries to templates array
- Include preview images for each new template
- Maintain existing selection logic

**Component Exports**
- Update main component index to export new templates
- Ensure dynamic imports work correctly

## Data Models

### Template Configuration

Each template will handle the complete `InvoiceType` interface:

```typescript
interface InvoiceType {
  sender: InvoiceSenderSchema
  receiver: InvoiceReceiverSchema
  details: InvoiceDetailsSchema
}
```

### Template Metadata

New templates will be added to the templates array:

```typescript
const templates = [
  // Existing templates 1-2
  {
    id: 3,
    name: "Template 3",
    description: "Red sidebar design",
    img: template3,
    component: <InvoiceTemplate3 {...formValues} />
  },
  // ... templates 4-7
]
```

## Template Design Specifications

### Template 3 - Red Sidebar Design
- **Color Scheme:** Red (#FF4444), Dark Navy (#2D3748), White (#FFFFFF)
- **Layout:** Left sidebar with brand info, main content area for invoice details
- **Typography:** Bold headers, clean body text
- **Special Elements:** Red total highlight box, dark item listing section

### Template 4 - Colorful Circles Design
- **Color Scheme:** Yellow (#FFD700), Orange (#FF8C00), Pink (#FF1493), Blue (#1E90FF), Green (#32CD32)
- **Layout:** Horizontal header with circles, table-based item listing
- **Typography:** Modern sans-serif, varied weights
- **Special Elements:** Overlapping circular brand elements, colorful borders

### Template 5 - Geometric Red Design
- **Color Scheme:** Red (#E53E3E), Black (#1A202C), White (#FFFFFF), Gray (#374151)
- **Layout:** Curved geometric header, clean body layout
- **Typography:** Bold modern fonts, geometric alignment
- **Special Elements:** Curved design elements using CSS clip-path or border-radius, modern organic shapes

### Template 6 - Blue Corporate Design
- **Color Scheme:** Blue (#3182CE), Dark Gray (#2D3748), Light Gray (#F7FAFC)
- **Layout:** Structured corporate sections, clear hierarchy
- **Typography:** Professional fonts, consistent spacing
- **Special Elements:** Blue accent headers, gradient signature area

### Template 7 - Minimalist Gray Design
- **Color Scheme:** Gray (#718096), Light Gray (#E2E8F0), White (#FFFFFF)
- **Layout:** Clean minimal sections, subtle dividers
- **Typography:** Simple clean fonts, generous whitespace
- **Special Elements:** Minimal branding, subtle accent colors

## Error Handling

### Template Loading
- Graceful fallback to Template 1 if new template fails to load
- Error logging for debugging template issues
- Consistent error boundaries around template components

### Data Validation
- All templates handle missing optional fields gracefully
- Proper null checks for logo, signature, payment info
- Default values for required fields

### PDF Generation
- Ensure all templates render correctly in PDF format
- Handle special characters and formatting
- Maintain layout integrity across different data sizes

## Testing Strategy

### Unit Testing
- Test each template component with various data combinations
- Verify proper handling of optional fields
- Test responsive behavior

### Integration Testing
- Test template selection and switching
- Verify PDF generation for all templates
- Test email functionality with new templates
- Verify export functionality works with all templates

### Visual Testing
- Compare rendered templates with design mockups
- Test across different screen sizes
- Verify print layout formatting

### End-to-End Testing
- Complete invoice creation workflow with each template
- PDF download and email sending
- Template persistence in saved invoices

## Implementation Notes

### CSS Considerations
- Use Tailwind CSS classes for consistency
- Implement responsive design patterns
- Ensure print-friendly styling
- Handle color contrast for accessibility

### Performance
- Lazy load templates to reduce initial bundle size
- Optimize images and assets
- Minimize re-renders during template switching

### Accessibility
- Proper heading hierarchy
- Sufficient color contrast ratios
- Screen reader friendly markup
- Keyboard navigation support

### Browser Compatibility
- Test across major browsers
- Ensure PDF generation works consistently
- Handle browser-specific rendering differences