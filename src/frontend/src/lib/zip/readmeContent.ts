/**
 * Shared README content helpers for product ZIPs
 * Provides consistent, readable instructions for app usage and marketplace uploads
 */

export function getAppUsageSection(): string {
  return `## How to Use This Product

This digital product was created using an automated product generator. Here's what you received:

### What's Included

- **PDF Guide**: Complete documentation with all modules and content
- **Cover Image**: Professional branding asset for marketing
- **Templates**: Ready-to-use templates you can customize
- **Checklists**: Step-by-step action items to implement the content
- **AI Prompts**: Curated prompts to enhance your workflow with AI tools

### Getting Started

1. Start by reading the PDF guide to understand the full content
2. Review the templates and customize them for your needs
3. Use the checklists to track your progress
4. Apply the AI prompts with tools like ChatGPT, Claude, or other AI assistants
5. Refer back to the materials as you implement the strategies

`;
}

export function getGumroadUploadSection(): string {
  return `## Uploading to Gumroad

Want to sell this product on Gumroad? Follow these steps:

### Prerequisites

- Create a free account at https://gumroad.com
- Have this ZIP file ready to upload
- Extract the cover image (cover.png) for your product thumbnail

### Step-by-Step Upload Process

1. **Log in** to your Gumroad account
2. **Click "Create"** → "Product" in the top navigation
3. **Choose "Digital product"** as the product type
4. **Enter product details**:
   - Product name (use the name from the PDF)
   - Description (expand on the content included)
   - Set your price (or enable pay-what-you-want)
5. **Upload this ZIP file** as the product file
6. **Upload the cover image** (cover.png) as your product thumbnail
7. **Add tags and categories** for better discoverability
8. **Preview your product page** to ensure everything looks professional
9. **Click "Publish"** to make your product live
10. **Share your product link** on social media and your website

### Tips for Success on Gumroad

- Write a compelling description highlighting the benefits and outcomes
- Use the cover image to create an eye-catching first impression
- Consider offering a preview or sample to increase conversions
- Set up email marketing to build your audience
- Engage with your customers and gather feedback
- Update your product based on customer suggestions

`;
}

export function getEtsyUploadSection(): string {
  return `## Uploading to Etsy

Want to sell this product on Etsy? Follow these steps:

### Prerequisites

- Create an Etsy seller account at https://etsy.com/sell
- Have this ZIP file ready to upload (under 20MB)
- Extract the cover image for listing photos
- Note: Etsy charges a $0.20 listing fee per product

### Step-by-Step Upload Process

1. **Log in** to your Etsy seller account
2. **Go to "Shop Manager"** → "Listings" → "Add a listing"
3. **Select "Digital product"** as the listing type
4. **Upload this ZIP file** (Etsy allows up to 5 files per listing)
5. **Add listing photos**:
   - Use cover.png as your main photo
   - Create additional images showing what's included
   - Show sample pages from the PDF
6. **Write your listing title** (max 140 characters, include keywords)
7. **Write a detailed description**:
   - Explain what buyers will receive
   - Highlight the benefits and outcomes
   - List all included files and resources
8. **Add relevant tags** (up to 13 tags for search visibility)
9. **Select the category** (e.g., "Digital Downloads" → "Templates")
10. **Set your price** (consider Etsy's 6.5% transaction fee)
11. **Choose "Instant download"** for delivery method
12. **Review and publish** your listing

### Tips for Success on Etsy

- Use all 10 photo slots to showcase your product thoroughly
- Optimize title and tags with keywords buyers actually search for
- Offer multiple related products to build a cohesive shop brand
- Respond quickly to customer messages and reviews
- Consider running Etsy Ads to boost visibility for new listings
- Include clear instructions about what buyers will receive
- Update your files anytime without creating a new listing

### Important Etsy Guidelines

- File size limit: 20MB per file (your ZIP should be well under this)
- Buyers can download files up to 5 times within 24 hours of purchase
- Transaction fee: 6.5% plus payment processing fees
- Listing fee: $0.20 per listing (renews every 4 months if not sold)

`;
}

export function getProductReadmeContent(
  productName: string,
  productSubtitle: string,
  productDescription: string,
  modules: Array<{ title: string; description: string }>,
  templateCount: number,
  checklistCount: number,
  promptCount: number
): string {
  const contentsItems = [
    '- **PDF Guide**: Complete product documentation',
    '- **Cover Image**: Product branding asset',
  ];

  if (templateCount > 0) {
    contentsItems.push(`- **Templates**: ${templateCount} ready-to-use templates`);
  }
  if (checklistCount > 0) {
    contentsItems.push(`- **Checklists**: ${checklistCount} actionable checklists`);
  }
  if (promptCount > 0) {
    contentsItems.push(`- **AI Prompts**: ${promptCount} curated prompts`);
  }

  const modulesSection = modules.length > 0
    ? `## Modules\n\n${modules.map((m, i) => `${i + 1}. **${m.title}**: ${m.description}`).join('\n')}\n\n`
    : '';

  return `# ${productName}

${productSubtitle}

## Description

${productDescription}

## Contents

${contentsItems.join('\n')}

${modulesSection}${getAppUsageSection()}${getGumroadUploadSection()}${getEtsyUploadSection()}---

Generated on ${new Date().toLocaleDateString()}
`;
}

export function getMasterReadmeContent(
  bundles: Array<{ productId: string; generatedAt: Date }>
): string {
  return `# Automation Products Bundle

This bundle contains ${bundles.length} complete digital products, each with comprehensive documentation, templates, checklists, and AI prompts.

## Contents

${bundles.map((b, i) => `${i + 1}. Product ${b.productId.split('-')[1]} (Generated: ${b.generatedAt.toLocaleDateString()})`).join('\n')}

Each product folder contains a complete ZIP package with:
- PDF documentation
- Cover image
- Templates, checklists, and AI prompts
- Individual README with full instructions

## How to Use This Bundle

1. **Extract the bundle**: Unzip this file to access all product folders
2. **Open each product folder**: Each contains a complete product ZIP
3. **Extract individual products**: Unzip each product to access its contents
4. **Read the product README**: Each product has detailed instructions

## Selling These Products

You can sell each product individually on platforms like Gumroad or Etsy. Each product ZIP is ready to upload as-is.

${getGumroadUploadSection()}${getEtsyUploadSection()}## Tips for Selling Multiple Products

- **Bundle pricing**: Offer a discount when customers buy multiple products
- **Product series**: Market these as a cohesive series or collection
- **Cross-promotion**: Mention your other products in each product's description
- **Email list**: Build an email list to notify customers of new products
- **Social proof**: Gather testimonials and reviews to build credibility

---

Bundle created on ${new Date().toLocaleDateString()}
`;
}
