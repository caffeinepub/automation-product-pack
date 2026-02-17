import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BookOpen, ShoppingCart, Store, Info } from 'lucide-react';

export default function ExportInstructions() {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle>How to Use This App & Upload Your Products</CardTitle>
        </div>
        <CardDescription>
          Complete step-by-step guide for creating, exporting, and selling your digital products
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">
              <Info className="mr-2 h-4 w-4" />
              App Usage
            </TabsTrigger>
            <TabsTrigger value="gumroad">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Gumroad
            </TabsTrigger>
            <TabsTrigger value="etsy">
              <Store className="mr-2 h-4 w-4" />
              Etsy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Getting Started</h3>
              <Alert>
                <AlertDescription>
                  This app helps you create professional digital products with PDFs, templates, checklists, and AI prompts.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Step 1: Sign In (Optional)</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Click the "Login" button in the header to sign in with Internet Identity</li>
                <li>Your products will be saved to the cloud and accessible from any device</li>
                <li>You can also use the app without signing in (local-only mode)</li>
                <li>In local-only mode, your products are saved in your browser's storage</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 2: Edit Your Products</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Use the product editor to customize each of the three products</li>
                <li>Fill in the product name, subtitle, and description</li>
                <li>Add or edit modules (chapters/sections) for your product</li>
                <li>Add AI prompts, templates, and checklists in their respective tabs</li>
                <li>Your changes are automatically saved as you type</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 3: Generate Products</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Click "Generate" on individual products to create just that product</li>
                <li>Or click "Generate All Products" to create all three at once</li>
                <li>Each product generates a PDF guide and a complete ZIP package</li>
                <li>Generation takes a few seconds per product</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 4: Preview Your Products</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>After generation, you'll see the Export screen (this page)</li>
                <li>View product covers, file sizes, and generation dates</li>
                <li>Each product includes a PDF and a complete ZIP package</li>
                <li>The ZIP contains: PDF, cover image, templates, checklists, and prompts</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 5: Download Your Products</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Click "PDF" to download just the PDF guide for a product</li>
                <li>Click "ZIP" to download the complete package for a product</li>
                <li>Click "Download All Products" to get a master ZIP with all three products</li>
                <li>The master ZIP includes separate folders for each product</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="gumroad" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Uploading to Gumroad</h3>
              <Alert>
                <AlertDescription>
                  Gumroad is perfect for selling digital products with instant delivery and simple setup.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Before You Start</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Create a free account at <a href="https://gumroad.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">gumroad.com</a></li>
                <li>Download the product ZIP file from this app</li>
                <li>Have your product cover image ready (included in the ZIP)</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Upload Steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Log in to your Gumroad account</li>
                <li>Click "Create" → "Product" in the top navigation</li>
                <li>Choose "Digital product" as the product type</li>
                <li>Enter your product name and description (copy from your product editor)</li>
                <li>Set your price (Gumroad supports pay-what-you-want pricing too)</li>
                <li>Upload the product ZIP file you downloaded from this app</li>
                <li>Upload the cover image (extract cover.png from the ZIP)</li>
                <li>Add product tags and categories for better discoverability</li>
                <li>Preview your product page to ensure everything looks good</li>
                <li>Click "Publish" to make your product live</li>
              </ol>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Tips for Success</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Write a compelling product description highlighting the benefits</li>
                <li>Use the cover image to create an eye-catching product thumbnail</li>
                <li>Consider offering a preview or sample to increase conversions</li>
                <li>Set up email marketing to build your audience</li>
                <li>Share your Gumroad link on social media and your website</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="etsy" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Uploading to Etsy</h3>
              <Alert>
                <AlertDescription>
                  Etsy is a popular marketplace for digital downloads with built-in traffic and buyer trust.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Before You Start</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Create an Etsy seller account at <a href="https://etsy.com/sell" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">etsy.com/sell</a></li>
                <li>Download the product ZIP file from this app</li>
                <li>Extract the cover image from the ZIP for your listing photos</li>
                <li>Note: Etsy charges a $0.20 listing fee per product</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Upload Steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Log in to your Etsy seller account</li>
                <li>Go to "Shop Manager" → "Listings" → "Add a listing"</li>
                <li>Select "Digital product" as the listing type</li>
                <li>Upload the product ZIP file (Etsy allows up to 5 files per listing)</li>
                <li>Add listing photos: Use the cover image as your main photo</li>
                <li>Write your listing title (max 140 characters, include keywords)</li>
                <li>Write a detailed description (copy from your product editor and expand)</li>
                <li>Add relevant tags (up to 13 tags for better search visibility)</li>
                <li>Select the appropriate category (e.g., "Digital Downloads" → "Templates")</li>
                <li>Set your price (consider Etsy's fees when pricing)</li>
                <li>Choose "Instant download" for delivery method</li>
                <li>Review your listing and click "Publish"</li>
              </ol>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Tips for Success</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Use all 10 photo slots: Show the cover, sample pages, and what's included</li>
                <li>Optimize your title and tags with keywords buyers search for</li>
                <li>Offer multiple products to build a cohesive shop brand</li>
                <li>Respond quickly to customer messages and reviews</li>
                <li>Consider running Etsy Ads to boost visibility for new listings</li>
                <li>Include clear instructions in your listing about what buyers will receive</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Important Notes</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Etsy's file size limit is 20MB per file (your ZIPs should be well under this)</li>
                <li>Buyers can download files up to 5 times within 24 hours of purchase</li>
                <li>You can update your digital files anytime without creating a new listing</li>
                <li>Etsy takes a 6.5% transaction fee plus payment processing fees</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
