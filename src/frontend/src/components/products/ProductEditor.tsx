import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Plus, Trash2 } from 'lucide-react';
import type { ProductEntry, ProductModule } from '../../types/productEntry';

interface ProductEditorProps {
  product: ProductEntry;
  onChange: (product: ProductEntry) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export default function ProductEditor({ product, onChange, onGenerate, isGenerating }: ProductEditorProps) {
  const updateField = (field: keyof ProductEntry, value: any) => {
    onChange({ ...product, [field]: value });
  };

  const addModule = () => {
    const newModule: ProductModule = {
      id: `module-${Date.now()}`,
      title: '',
      description: '',
    };
    updateField('modules', [...product.modules, newModule]);
  };

  const updateModule = (index: number, field: keyof ProductModule, value: string) => {
    const updated = [...product.modules];
    updated[index] = { ...updated[index], [field]: value };
    updateField('modules', updated);
  };

  const removeModule = (index: number) => {
    updateField('modules', product.modules.filter((_, i) => i !== index));
  };

  const addPrompt = () => {
    updateField('prompts', [...product.prompts, '']);
  };

  const updatePrompt = (index: number, value: string) => {
    const updated = [...product.prompts];
    updated[index] = value;
    updateField('prompts', updated);
  };

  const removePrompt = (index: number) => {
    updateField('prompts', product.prompts.filter((_, i) => i !== index));
  };

  const addTemplate = () => {
    updateField('templates', [...product.templates, '']);
  };

  const updateTemplate = (index: number, value: string) => {
    const updated = [...product.templates];
    updated[index] = value;
    updateField('templates', updated);
  };

  const removeTemplate = (index: number) => {
    updateField('templates', product.templates.filter((_, i) => i !== index));
  };

  const addChecklist = () => {
    updateField('checklists', [...product.checklists, '']);
  };

  const updateChecklist = (index: number, value: string) => {
    const updated = [...product.checklists];
    updated[index] = value;
    updateField('checklists', updated);
  };

  const removeChecklist = (index: number) => {
    updateField('checklists', product.checklists.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{product.name || 'Untitled Product'}</CardTitle>
            <CardDescription>Configure your digital product details</CardDescription>
          </div>
          <Button onClick={onGenerate} disabled={isGenerating || !product.name}>
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div>
              <Label htmlFor={`name-${product.id}`}>Product Name *</Label>
              <Input
                id={`name-${product.id}`}
                value={product.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., AI Automation Masterclass"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`subtitle-${product.id}`}>Subtitle</Label>
              <Input
                id={`subtitle-${product.id}`}
                value={product.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="e.g., Transform Your Workflow with AI"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`description-${product.id}`}>Description</Label>
              <Textarea
                id={`description-${product.id}`}
                value={product.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe what this product offers..."
                rows={4}
                className="mt-1"
              />
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <Label>Modules & Chapters</Label>
              <Button onClick={addModule} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Module
              </Button>
            </div>
            {product.modules.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No modules yet. Click "Add Module" to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {product.modules.map((module, index) => (
                  <Card key={module.id}>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="secondary">Module {index + 1}</Badge>
                        <Button
                          onClick={() => removeModule(index)}
                          size="sm"
                          variant="ghost"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        value={module.title}
                        onChange={(e) => updateModule(index, 'title', e.target.value)}
                        placeholder="Module title"
                      />
                      <Textarea
                        value={module.description}
                        onChange={(e) => updateModule(index, 'description', e.target.value)}
                        placeholder="Module description"
                        rows={2}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="prompts" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <Label>AI Prompts</Label>
              <Button onClick={addPrompt} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add Prompt
              </Button>
            </div>
            {product.prompts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No prompts yet. Click "Add Prompt" to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {product.prompts.map((prompt, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={prompt}
                      onChange={(e) => updatePrompt(index, e.target.value)}
                      placeholder={`Prompt ${index + 1}`}
                      rows={2}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => removePrompt(index)}
                      size="sm"
                      variant="ghost"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Templates</Label>
                <Button onClick={addTemplate} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Template
                </Button>
              </div>
              {product.templates.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No templates yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {product.templates.map((template, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={template}
                        onChange={(e) => updateTemplate(index, e.target.value)}
                        placeholder={`Template ${index + 1}`}
                        rows={3}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeTemplate(index)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Checklists</Label>
                <Button onClick={addChecklist} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Checklist
                </Button>
              </div>
              {product.checklists.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No checklists yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {product.checklists.map((checklist, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={checklist}
                        onChange={(e) => updateChecklist(index, e.target.value)}
                        placeholder={`Checklist ${index + 1}`}
                        rows={3}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeChecklist(index)}
                        size="sm"
                        variant="ghost"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
