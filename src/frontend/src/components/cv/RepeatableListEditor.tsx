import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';

interface RepeatableListEditorProps<T extends { id: string }> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, onChange: (updated: T) => void) => React.ReactNode;
  createNew: () => T;
  emptyMessage: string;
}

export default function RepeatableListEditor<T extends { id: string }>({
  items,
  onChange,
  renderItem,
  createNew,
  emptyMessage,
}: RepeatableListEditorProps<T>) {
  const handleAdd = () => {
    onChange([...items, createNew()]);
  };

  const handleUpdate = (index: number, updated: T) => {
    const newItems = [...items];
    newItems[index] = updated;
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">{emptyMessage}</div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={item.id} className="p-4">
              <div className="space-y-4">
                {renderItem(item, (updated) => handleUpdate(index, updated))}
                <Separator />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Button type="button" variant="outline" onClick={handleAdd} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add {items.length === 0 ? 'First' : 'Another'} Entry
      </Button>
    </div>
  );
}
