import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, Clock, CheckCircle, AlertCircle, Search, Filter } from 'lucide-react';

// Mock data for demonstration
const mockReports = [
  {
    id: 'SR1735502A8B3',
    category: 'harassment',
    description: 'Inappropriate comments made by a senior student during orientation week...',
    status: 'under-review',
    priority: 'high',
    dateSubmitted: '2024-01-15T10:30:00Z',
    location: 'Main Campus Auditorium',
    assignedTo: 'Dr. Smith',
  },
  {
    id: 'SR1735502C9D4',
    category: 'bullying',
    description: 'Repeated exclusion from group activities and verbal intimidation...',
    status: 'in-progress',
    priority: 'medium',
    dateSubmitted: '2024-01-14T14:20:00Z',
    location: 'Student Housing Block B',
    assignedTo: 'Ms. Johnson',
  },
  {
    id: 'SR1735502E5F6',
    category: 'safety',
    description: 'Broken lighting in parking area creating unsafe conditions...',
    status: 'resolved',
    priority: 'low',
    dateSubmitted: '2024-01-10T09:15:00Z',
    location: 'Parking Lot C',
    assignedTo: 'Maintenance Team',
  },
];

const statusColors = {
  'under-review': 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'resolved': 'bg-green-100 text-green-800',
  'escalated': 'bg-red-100 text-red-800',
};

const priorityColors = {
  'low': 'bg-gray-100 text-gray-800',
  'medium': 'bg-orange-100 text-orange-800',
  'high': 'bg-red-100 text-red-800',
  'critical': 'bg-purple-100 text-purple-800',
};

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under-review': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'escalated': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusUpdate = (reportId: string, newStatus: string) => {
    // This would connect to your backend
    console.log(`Updating report ${reportId} to status: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-trust mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track anonymous reports from the SafeVoice platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-trust">24</p>
                </div>
                <Eye className="h-8 w-8 text-trust-light" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Under Review</p>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-safe">4</p>
                </div>
                <CheckCircle className="h-8 w-8 text-safe" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by tracking ID or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="under-review">Under Review</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-[var(--shadow-soft)] transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-trust">#{report.id}</h3>
                      <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1">{report.status.replace('-', ' ')}</span>
                      </Badge>
                      <Badge className={priorityColors[report.priority as keyof typeof priorityColors]}>
                        {report.priority} priority
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize mb-2">
                      Category: {report.category.replace('-', ' ')}
                    </p>
                    <p className="text-foreground mb-3">{report.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>📍 {report.location}</span>
                      <span>📅 {new Date(report.dateSubmitted).toLocaleDateString()}</span>
                      <span>👤 Assigned to: {report.assignedTo}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Select onValueChange={(value) => handleStatusUpdate(report.id, value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-review">Under Review</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No reports found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}