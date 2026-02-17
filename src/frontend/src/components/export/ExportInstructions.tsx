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
          <CardTitle>How to Use & Sell Your Products</CardTitle>
        </div>
        <CardDescription>
          Complete guide for editing, exporting, and selling your digital products
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
                  Create professional digital products with PDFs, templates, checklists, and AI prompts — ready to sell on Etsy or Gumroad.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Step 1: Sign In (Optional)</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Click "Login" in the header to sign in with Internet Identity</li>
                <li>Your products sync to the cloud and work across all devices</li>
                <li>Or use the app without signing in (browser storage only)</li>
                <li>Local mode saves products in your browser automatically</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 2: Customize Your Products</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Edit each of the three pre-filled products in the editor</li>
                <li>Update product name, subtitle, and description</li>
                <li>Add or modify modules (chapters/sections)</li>
                <li>Customize AI prompts, templates, and checklists</li>
                <li>Changes save automatically as you type</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 3: Generate Your Products</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Click "Generate" on any product to create just that one</li>
                <li>Or click "Generate All Products" to create all three at once</li>
                <li>Each product generates a PDF guide and complete ZIP package</li>
                <li>Generation takes a few seconds per product</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 4: Preview & Download</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>After generation, view the Export screen (this page)</li>
                <li>See product covers, file sizes, and generation dates</li>
                <li>Download individual PDFs or complete ZIP packages</li>
                <li>Each ZIP includes: PDF, cover image, templates, checklists, and prompts</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Step 5: Sell Your Products</h4>
              <ul className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Upload the ZIP file to Gumroad or Etsy (see tabs above)</li>
                <li>Use the included cover image for your product thumbnail</li>
                <li>Copy your product description from the editor</li>
                <li>Set your price and publish your listing</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="gumroad" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Selling on Gumroad</h3>
              <Alert>
                <AlertDescription>
                  Gumroad offers instant delivery, simple setup, and flexible pricing — perfect for digital products.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Before You Start</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Create a free account at <a href="https://gumroad.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">gumroad.com</a></li>
                <li>Download your product ZIP from this app</li>
                <li>Extract the cover image (cover.png) for your thumbnail</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Upload Steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Log in to Gumroad and click "Create" → "Product"</li>
                <li>Choose "Digital product" as the product type</li>
                <li>Enter your product name and description</li>
                <li>Set your price (or enable pay-what-you-want)</li>
                <li>Upload the product ZIP file</li>
                <li>Upload cover.png as your product thumbnail</li>
                <li>Add tags and categories for discoverability</li>
                <li>Preview your product page</li>
                <li>Click "Publish" to go live</li>
                <li>Share your product link on social media</li>
              </ol>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Tips for Success</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Highlight benefits and outcomes in your description</li>
                <li>Use the cover image to create an eye-catching thumbnail</li>
                <li>Offer a preview or sample to boost conversions</li>
                <li>Build an email list to grow your audience</li>
                <li>Share your link on social media and your website</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="etsy" className="space-y-4 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Selling on Etsy</h3>
              <Alert>
                <AlertDescription>
                  Etsy provides built-in traffic, buyer trust, and a marketplace designed for digital downloads.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Before You Start</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Create an Etsy seller account at <a href="https://etsy.com/sell" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">etsy.com/sell</a></li>
                <li>Download your product ZIP from this app</li>
                <li>Extract cover.png for your listing photos</li>
                <li>Note: Etsy charges $0.20 per listing</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Upload Steps</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Log in to Etsy and go to "Shop Manager" → "Listings"</li>
                <li>Click "Add a listing" and select "Digital product"</li>
                <li>Upload your product ZIP file (under 20MB)</li>
                <li>Add listing photos (use cover.png as main image)</li>
                <li>Write a keyword-rich title (max 140 characters)</li>
                <li>Create a detailed description of what's included</li>
                <li>Add up to 13 tags for search visibility</li>
                <li>Select category (e.g., Digital Downloads → Templates)</li>
                <li>Set your price (factor in Etsy's 6.5% transaction fee)</li>
                <li>Choose "Instant download" for delivery</li>
                <li>Review and publish your listing</li>
              </ol>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Tips for Success</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>Use all 10 photo slots to showcase your product</li>
                <li>Optimize title and tags with buyer search keywords</li>
                <li>Build a cohesive shop brand with multiple products</li>
                <li>Respond quickly to messages and reviews</li>
                <li>Consider Etsy Ads to boost new listing visibility</li>
                <li>Include clear instructions about what buyers receive</li>
              </ul>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Etsy Guidelines</h4>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                <li>File size limit: 20MB per file</li>
                <li>Buyers can download up to 5 times in 24 hours</li>
                <li>Transaction fee: 6.5% plus payment processing</li>
                <li>Listing fee: $0.20 (renews every 4 months if unsold)</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
