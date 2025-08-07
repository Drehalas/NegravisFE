'use client';

import { useState } from 'react';
import { FileText, Shield, Upload, Eye, Download, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'drivers_license' | 'passport' | 'national_id' | 'professional_license' | 'oracle_data';
  status: 'verified' | 'pending' | 'expired';
  uploadDate: string;
  fileId: string;
  hash: string;
  encrypted: boolean;
  size: string;
}

export default function HFSShowcase() {
  const [activeFeature, setActiveFeature] = useState('storage');
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Oracle Data Feed - BTC Prices',
      type: 'oracle_data',
      status: 'verified',
      uploadDate: '2024-01-15',
      fileId: '0.0.4629750',
      hash: 'sha256:a1b2c3d4e5f6...',
      encrypted: true,
      size: '2.3 MB'
    },
    {
      id: '2', 
      name: 'Consensus Algorithm Config',
      type: 'oracle_data',
      status: 'verified',
      uploadDate: '2024-01-12',
      fileId: '0.0.4629751',
      hash: 'sha256:f6e5d4c3b2a1...',
      encrypted: true,
      size: '1.1 MB'
    },
    {
      id: '3',
      name: 'Provider Authentication Keys',
      type: 'professional_license',
      status: 'pending',
      uploadDate: '2024-01-10',
      fileId: '0.0.4629752',
      hash: 'sha256:b2a1c3d4e5f6...',
      encrypted: true,
      size: '512 KB'
    },
    {
      id: '4',
      name: 'System Audit Logs',
      type: 'oracle_data',
      status: 'verified',
      uploadDate: '2024-01-08',
      fileId: '0.0.4629753',
      hash: 'sha256:c3d4e5f6a1b2...',
      encrypted: true,
      size: '5.7 MB'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'oracle_data':
        return 'Oracle Data';
      case 'drivers_license':
        return 'Driver License';
      case 'passport':
        return 'Passport';
      case 'national_id':
        return 'National ID';
      case 'professional_license':
        return 'Professional License';
      default:
        return 'Document';
    }
  };

  const storageMetrics = [
    { label: 'Total Files', value: '1,247', change: '+23' },
    { label: 'Storage Used', value: '47.3 GB', change: '+2.1 GB' },
    { label: 'Encrypted Files', value: '100%', change: '0%' },
    { label: 'Compliance Level', value: 'GDPR/HIPAA', change: 'Certified' }
  ];

  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full mb-4">
            <FileText className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-medium">Hedera File Service</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Secure Document Storage</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Store Oracle data, audit logs, and sensitive documents with AES-256 encryption, 
            GDPR/HIPAA compliance, and immutable access tracking on Hedera File Service.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-700 p-1 rounded-lg">
            {[
              { id: 'storage', label: 'File Storage', icon: FileText },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'upload', label: 'Upload', icon: Upload }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeature(tab.id)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                    activeFeature === tab.id
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
          {activeFeature === 'storage' && (
            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* File List */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-6">Stored Files</h3>
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <span>{getTypeLabel(doc.type)}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>File ID: {doc.fileId}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(doc.status)}
                          <span className={`text-sm capitalize ${
                            doc.status === 'verified' ? 'text-green-400' :
                            doc.status === 'pending' ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {doc.status}
                          </span>
                          <div className="flex gap-1 ml-4">
                            <button className="p-2 text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-white">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Storage Metrics */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Storage Metrics</h3>
                  <div className="space-y-4">
                    {storageMetrics.map((metric, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                        <div className="text-xl font-bold text-white">{metric.value}</div>
                        <div className="text-sm text-green-400">{metric.change}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-medium mb-3">File Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Oracle Data</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Audit Logs</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Config Files</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeature === 'security' && (
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6">Security Features</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Encryption & Compliance</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
                      <Shield className="w-6 h-6 text-green-400 mt-1" />
                      <div>
                        <h5 className="font-medium text-green-400">AES-256 Encryption</h5>
                        <p className="text-sm text-gray-300 mt-1">
                          All files encrypted with military-grade AES-256 encryption before storage.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-blue-400 mt-1" />
                      <div>
                        <h5 className="font-medium text-blue-400">GDPR Compliance</h5>
                        <p className="text-sm text-gray-300 mt-1">
                          Full GDPR compliance with right to deletion and data portability.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-400 mt-1" />
                      <div>
                        <h5 className="font-medium text-purple-400">HIPAA Ready</h5>
                        <p className="text-sm text-gray-300 mt-1">
                          Healthcare data protection with audit trails and access controls.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Access Control</h4>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium mb-2">File Permissions</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Read Access</span>
                            <span className="text-green-400">Authorized</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Write Access</span>
                            <span className="text-yellow-400">Admin Only</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">Delete Access</span>
                            <span className="text-red-400">Restricted</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Audit Trail</h5>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div>• File upload: 2024-01-15 14:32:18</div>
                          <div>• Access granted: 2024-01-15 14:35:22</div>
                          <div>• File viewed: 2024-01-15 15:22:45</div>
                          <div>• Permission updated: 2024-01-15 16:18:33</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeature === 'upload' && (
            <div className="p-8">
              <h3 className="text-xl font-semibold mb-6">Upload New File</h3>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium mb-2">Drop files here</h4>
                    <p className="text-gray-400 mb-4">or click to browse</p>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md transition-colors">
                      Select Files
                    </button>
                    <div className="mt-4 text-sm text-gray-500">
                      Supports: PDF, DOC, TXT, JSON, CSV (Max: 100MB)
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="font-medium mb-3">Upload Settings</h5>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">File Type</label>
                        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md">
                          <option>Oracle Data</option>
                          <option>Audit Log</option>
                          <option>Configuration</option>
                          <option>Document</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Access Level</label>
                        <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md">
                          <option>Private</option>
                          <option>Team</option>
                          <option>Public</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="encrypt" 
                          defaultChecked
                          className="rounded"
                        />
                        <label htmlFor="encrypt" className="text-sm">
                          Enable AES-256 encryption
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Upload Queue</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">oracle-config.json</span>
                        <span className="text-green-400">Completed</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full w-full"></div>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        File ID: 0.0.4629754 • 2.1 MB
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">audit-log-jan.csv</span>
                        <span className="text-blue-400">Uploading...</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        75% • 5.3 MB / 7.1 MB
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">provider-keys.txt</span>
                        <span className="text-gray-400">Queued</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gray-600 h-2 rounded-full w-0"></div>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        Waiting • 512 KB
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <h5 className="font-medium mb-2">Storage Summary</h5>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div className="flex justify-between">
                        <span>Files uploaded today:</span>
                        <span>12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total size:</span>
                        <span>847 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Encrypted files:</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}