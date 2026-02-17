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
    <Card className="shadow-md border">
      <CardHeader className="space-y-3 pb-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-1.5 flex-1 min-w-0">
            <CardTitle className="text-2xl">{product.name || 'Untitled Product'}</CardTitle>
            <CardDescription className="text-base">
              Configure your digital product details
            </CardDescription>
          </div>
          <Button 
            onClick={onGenerate} 
            disabled={isGenerating || !product.name}
            className="w-full sm:w-auto flex-shrink-0"
            size="default"
          >
            {isGenerating ? 'Generating...' : 'Generate'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-5 mt-0">
            <div className="space-y-2">
              <Label htmlFor={`name-${product.id}`} className="text-sm font-medium">
                Product Name *
              </Label>
              <Input
                id={`name-${product.id}`}
                value={product.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., AI Automation Masterclass"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`subtitle-${product.id}`} className="text-sm font-medium">
                Subtitle
              </Label>
              <Input
                id={`subtitle-${product.id}`}
                value={product.subtitle}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="e.g., Transform Your Workflow with AI"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${product.id}`} className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id={`description-${product.id}`}
                value={product.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe what this product offers..."
                rows={5}
                className="resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-5 mt-0">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Modules & Chapters</Label>
              <Button onClick={addModule} size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Module
              </Button>
            </div>
            {product.modules.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  No modules yet. Click "Add Module" to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.modules.map((module, index) => (
                  <Card key={module.id} className="bg-muted/50">
                    <CardContent className="pt-5 pb-5 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <Badge variant="secondary" className="font-medium">
                          Module {index + 1}
                        </Badge>
                        <Button
                          onClick={() => removeModule(index)}
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        <Input
                          value={module.title}
                          onChange={(e) => updateModule(index, 'title', e.target.value)}
                          placeholder="Module title"
                        />
                        <Textarea
                          value={module.description}
                          onChange={(e) => updateModule(index, 'description', e.target.value)}
                          placeholder="Module description"
                          rows={3}
                          className="resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="prompts" className="space-y-5 mt-0">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">AI Prompts</Label>
              <Button onClick={addPrompt} size="sm" variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Prompt
              </Button>
            </div>
            {product.prompts.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">
                  No prompts yet. Click "Add Prompt" to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {product.prompts.map((prompt, index) => (
                  <div key={index} className="flex gap-3">
                    <Textarea
                      value={prompt}
                      onChange={(e) => updatePrompt(index, e.target.value)}
                      placeholder={`Prompt ${index + 1}`}
                      rows={3}
                      className="flex-1 resize-none"
                    />
                    <Button
                      onClick={() => removePrompt(index)}
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-0">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Templates</Label>
                <Button onClick={addTemplate} size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Template
                </Button>
              </div>
              {product.templates.length === 0 ? (
                <div className="text-center py-8 px-4 border border-dashed rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    No templates yet. Click "Add Template" to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {product.templates.map((template, index) => (
                    <div key={index} className="flex gap-3">
                      <Input
                        value={template}
                        onChange={(e) => updateTemplate(index, e.target.value)}
                        placeholder={`Template ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeTemplate(index)}
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 p-0 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Checklists</Label>
                <Button onClick={addChecklist} size="sm" variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Checklist
                </Button>
              </div>
              {product.checklists.length === 0 ? (
                <div className="text-center py-8 px-4 border border-dashed rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    No checklists yet. Click "Add Checklist" to get started.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {product.checklists.map((checklist, index) => (
                    <div key={index} className="flex gap-3">
                      <Input
                        value={checklist}
                        onChange={(e) => updateChecklist(index, e.target.value)}
                        placeholder={`Checklist ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => removeChecklist(index)}
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 p-0 flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
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
