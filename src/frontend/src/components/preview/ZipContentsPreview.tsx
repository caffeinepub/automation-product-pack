import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { FileText, Image, FolderOpen } from 'lucide-react';
import type { ProductEntry } from '../../types/productEntry';

interface ZipContentsPreviewProps {
  product: ProductEntry;
}

export default function ZipContentsPreview({ product }: ZipContentsPreviewProps) {
  const items = [
    { name: `${product.name}.pdf`, icon: FileText, type: 'file' },
    { name: 'cover.png', icon: Image, type: 'file' },
    { name: 'README.md', icon: FileText, type: 'file' },
  ];

  if (product.templates.length > 0) {
    items.push({ name: 'templates/', icon: FolderOpen, type: 'folder' });
    product.templates.forEach((_, i) => {
      items.push({ name: `  template-${i + 1}.txt`, icon: FileText, type: 'file' });
    });
  }

  if (product.checklists.length > 0) {
    items.push({ name: 'checklists/', icon: FolderOpen, type: 'folder' });
    product.checklists.forEach((_, i) => {
      items.push({ name: `  checklist-${i + 1}.md`, icon: FileText, type: 'file' });
    });
  }

  if (product.prompts.length > 0) {
    items.push({ name: 'prompts/', icon: FolderOpen, type: 'folder' });
    product.prompts.forEach((_, i) => {
      items.push({ name: `  prompt-${i + 1}.txt`, icon: FileText, type: 'file' });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ZIP Contents</CardTitle>
        <CardDescription>Files that will be included in the download</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="space-y-1 font-mono text-sm">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2 py-1">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className={item.type === 'folder' ? 'font-semibold' : ''}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
