import React, { useState } from 'react';
import { AlertCircle, Droplet, Sprout, Bug, Info, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { recommendations } from '../data/mockData';

const getIcon = (category: string) => {
  switch (category) {
    case 'irrigation':
      return <Droplet className="h-5 w-5 text-blue-500" />;
    case 'fertilizer':
      return <Sprout className="h-5 w-5 text-green-500" />;
    case 'pest':
      return <Bug className="h-5 w-5 text-red-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-500" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const Recommendations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [expandedRecs, setExpandedRecs] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedRecs(prev => 
      prev.includes(id) ? prev.filter(recId => recId !== id) : [...prev, id]
    );
  };

  const filteredRecs = recommendations
    .filter(rec => rec.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  rec.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(rec => selectedCategory === 'all' ? true : rec.category === selectedCategory)
    .filter(rec => selectedPriority === 'all' ? true : rec.priority === selectedPriority);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <AlertCircle className="h-6 w-6 mr-2 text-yellow-500" />
          Recommendations
        </h2>
        <span className="text-sm text-gray-500">{filteredRecs.length} items</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search recommendations..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="irrigation">Irrigation</option>
            <option value="fertilizer">Fertilizer</option>
            <option value="pest">Pest Control</option>
            <option value="general">General</option>
          </select>
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {filteredRecs.map((rec) => (
          <div 
            key={rec.id} 
            className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                {getIcon(rec.category)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium">{rec.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleExpand(rec.id)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {expandedRecs.includes(rec.id) ? 
                      <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    }
                  </button>
                </div>
                <p className={`mt-1 text-gray-600 ${expandedRecs.includes(rec.id) ? '' : 'line-clamp-2'}`}>
                  {rec.description}
                </p>
                {expandedRecs.includes(rec.id) && rec.steps && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-gray-700">Steps to follow:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                      {rec.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <span>{rec.category}</span>
                  <span>•</span>
                  <span>{rec.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;