import { useState } from 'react';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Header } from '../components/Layout/Header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { GitBranch, ArrowLeft, Rocket, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const mockRepos = [
  { id: '1', name: 'acme/my-nextjs-app', description: 'Next.js application' },
  { id: '2', name: 'acme/api-backend', description: 'Express API backend' },
  { id: '3', name: 'acme/dashboard-ui', description: 'React dashboard' },
  { id: '4', name: 'acme/mobile-api', description: 'Mobile app backend' },
  { id: '5', name: 'acme/marketing-site', description: 'Marketing website' },
];

export default function NewProjectPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [projectType, setProjectType] = useState('frontend');
  const [buildCommand, setBuildCommand] = useState('npm run build');
  const [outputDir, setOutputDir] = useState('dist');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigate('/projects/1');
  };

  return (
    <DashboardLayout>
      <Header title="Create New Project" />

      <div className="p-6 max-w-2xl mx-auto animate-fade-in">
        <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${step >= s ? 'bg-[#06f8d8] text-primary-foreground' : 'bg-secondary text-white/60'}
              `}>
                {s}
              </div>
              <span className={step >= s ? 'text-white' : 'text-white/60'}>
                {s === 1 ? 'Select Repo' : s === 2 ? 'Configure' : 'Deploy'}
              </span>
              {s < 3 && <div className="w-12 h-px bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Repository */}
        {step === 1 && (
          <div className="bg-[#090b30]/80 backdrop-blur-xl border border-white/10 rounded-lg   p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">Select a GitHub Repository</h2>
            <div className="space-y-3">
              {mockRepos.map((repo) => (
                <button
                  key={repo.id}
                  onClick={() => setSelectedRepo(repo.id)}
                  className={`
                    w-full p-4 rounded-lg border text-left transition-all
                    ${selectedRepo === repo.id 
                      ? 'border-[#06f8d8] bg-[#06f8d8]/5' 
                      : 'border-white/10 hover:border-[#06f8d8]/50 hover:bg-[#090b30]/50'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="font-medium text-white">{repo.name}</p>
                      <p className="text-sm text-white/60">{repo.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <Button 
              className="w-full mt-4 p-5 bg-[#06f8d8] text-background hover:bg-[#06f8d8]/80 font-medium cursor-pointer" 
              disabled={!selectedRepo}
              onClick={() => setStep(2)}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Configure Project */}
        {step === 2 && (
          <div className="bg-[#090b30]/80 backdrop-blur-xl border border-white/10 rounded-lg   p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Configure Your Project</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Project Type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger className="bg-[#111457] border-white/10 w-full text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frontend">Frontend (React / Next.js)</SelectItem>
                    <SelectItem value="backend">Backend (Node / Express)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Build Command</Label>
                <Input
                  value={buildCommand}
                  onChange={(e) => setBuildCommand(e.target.value)}
                  placeholder="npm run build"
                  className="font-mono bg-[#111457] border-white/10 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label>Output Directory</Label>
                <Input
                  value={outputDir}
                  onChange={(e) => setOutputDir(e.target.value)}
                  placeholder="dist"
                  className="font-mono bg-[#111457] border-white/10 text-white"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" 
              onClick={() => setStep(1)}
              className="border-white/10 text-white hover:border-[#06f8d8]/50 hover:bg-[#06f8d8] hover:text-black p-5 mt-4" 
              >Back</Button>

              <Button 
              className="flex-1 w-full mt-4 p-5 bg-[#06f8d8] text-background hover:bg-[#06f8d8]/80 font-medium cursor-pointer"
              onClick={() => setStep(3)}>Continue</Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Deploy */}
        {step === 3 && (
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Review & Deploy</h2>
            
            <div className="space-y-4 p-4 bg-secondary/30 rounded-lg">
              <div className="flex justify-between">
                <span className="text-white/60">Repository</span>
                <span className="font-mono text-white">acme/my-nextjs-app</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Type</span>
                <span className="text-white capitalize">{projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Build Command</span>
                <span className="font-mono text-white">{buildCommand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Output Directory</span>
                <span className="font-mono text-white">{outputDir}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline"
              onClick={() => setStep(2)} disabled={isCreating}
              className="border-white/10 text-white hover:border-[#06f8d8]/50 hover:bg-[#06f8d8] hover:text-black p-5 mt-4">              Back
              </Button>

              <Button className="flex-1 w-full mt-4 p-5 bg-[#06f8d8] text-background hover:bg-[#06f8d8]/80 font-medium cursor-pointer" 
              onClick={handleCreate} disabled={isCreating}>
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Project...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Create Project
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
