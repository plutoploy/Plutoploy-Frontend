import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { Header } from '../components/Layout/Header';
import { EnvVariablesEditor } from '../components/ui/EnvVariablesEditor';

const globalEnvVariables = [
  { id: '1', key: 'GLOBAL_API_KEY', value: 'sk-global-...', isSecret: true },
  { id: '2', key: 'NODE_ENV', value: 'production', isSecret: false },
  { id: '3', key: 'CDN_URL', value: 'https://cdn.deployhub.dev', isSecret: false },
];

export default function EnvironmentPage() {
  return (
    <DashboardLayout>
      <Header 
        title="Environment Variables" 
        subtitle="Manage global environment variables for all projects"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        <div className="bg-[#000000]/80 backdrop-blur-xl border border-white/10 rounded-lg  p-4 border-l-4 border-l-[#06f8d8]">
          <p className="text-sm text-white/60">
            <strong className="text-white">Note:</strong> Global environment variables are available to all projects. 
            For project-specific variables, go to the project's Environment tab.
          </p>
        </div>

        <EnvVariablesEditor variables={globalEnvVariables} />
      </div>
    </DashboardLayout>
  );
}
