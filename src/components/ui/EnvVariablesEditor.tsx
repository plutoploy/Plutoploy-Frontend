import { useState } from 'react';
import { Eye, EyeOff, Plus, Trash2, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
// import { cn } from '../../lib/utils';

interface EnvVariable {
  id: string;
  key: string;
  value: string;
  isSecret: boolean;
}

interface EnvVariablesEditorProps {
  variables: EnvVariable[];
  onSave?: (variables: EnvVariable[]) => void;
}

export function EnvVariablesEditor({ variables: initialVariables, onSave }: EnvVariablesEditorProps) {
  const [variables, setVariables] = useState<EnvVariable[]>(initialVariables);
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

  const toggleSecretVisibility = (id: string) => {
    setVisibleSecrets(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addVariable = () => {
    const newVar: EnvVariable = {
      id: crypto.randomUUID(),
      key: '',
      value: '',
      isSecret: false,
    };
    setVariables([...variables, newVar]);
  };

  const updateVariable = (id: string, field: 'key' | 'value', value: string) => {
    setVariables(variables.map(v => 
      v.id === id ? { ...v, [field]: value } : v
    ));
  };

  const removeVariable = (id: string) => {
    setVariables(variables.filter(v => v.id !== id));
  };

  const handleSave = () => {
    onSave?.(variables);
  };

  return (
    <div className="bg-[#090b30] backdrop-blur-xl border border-white/10 rounded-lg">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-medium text-white">Environment Variables</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={addVariable} className='text-white border-white/10 p-5 bg-[#04062b]'>
            <Plus className="w-4 h-4 mr-1" />
            Add Variable
          </Button>
          <Button size="sm" onClick={handleSave} className='bg-[#06f8d8] text-black p-5'>
            <Save className="w-4 h-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4 px-2 text-sm text-white/60">
          <span>Key</span>
          <span>Value</span>
          <span className="w-20"></span>
        </div>

        {/* Variables */}
        {variables.map((variable) => (
          <div 
            key={variable.id}
            className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center p-2 rounded-lg text-white bg-[#0b0c37] hover:bg-[#090b30]/50 transition-colors"
          >
            <Input
              value={variable.key}
              onChange={(e) => updateVariable(variable.id, 'key', e.target.value)}
              placeholder="VARIABLE_NAME"
              className="font-mono text-sm p-5 bg-[#090b30] border border-white/10"
            />
            <div className="relative">
              <Input
                type={variable.isSecret && !visibleSecrets.has(variable.id) ? 'password' : 'text'}
                value={variable.value}
                onChange={(e) => updateVariable(variable.id, 'value', e.target.value)}
                placeholder="value"
                className="font-mono text-sm p-5 bg-[#090b30] border border-white/10 pr-10"
              />
              {variable.isSecret && (
                <button
                  onClick={() => toggleSecretVisibility(variable.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {visibleSecrets.has(variable.id) ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 w-20">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeVariable(variable.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {variables.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No environment variables configured.</p>
            <Button variant="link" onClick={addVariable} className="mt-2">
              Add your first variable
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
