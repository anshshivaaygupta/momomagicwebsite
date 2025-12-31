'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageDropZone } from '@/components/cms/ImageDropZone';
import { ContentAnalytics } from '@/components/cms/ContentAnalytics';
import { ContentStateManager, ContentState } from '@/components/cms/ContentStateManager';
import { VisualDesignPanel } from '@/components/cms/VisualDesignPanel';

interface JobPosting {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  isActive: boolean;
  postedDate: string;
  applicationsCount: number;
}

interface JobApplication {
  id: string;
  jobId: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  position: string;
  experience: string;
  expectedSalary: string;
  noticePeriod: string;
  motivation: string;
  skills: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  appliedDate: string;
}

export default function CareerManagementPage() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: 'job-001',
      title: 'Momos Specialist',
      category: 'Kitchen Staff',
      location: 'Sherghati, Bihar',
      type: 'Full-time',
      experience: '0-2 years',
      salary: '₹10,000 - ₹15,000/month',
      description: 'We are looking for a passionate momos specialist to join our kitchen team.',
      requirements: ['Experience in momos preparation (preferred)', 'Understanding of food hygiene standards'],
      responsibilities: ['Prepare various types of momos', 'Maintain cleanliness in kitchen'],
      benefits: ['Competitive salary', 'Free meals during shifts'],
      isActive: true,
      postedDate: '2025-01-15',
      applicationsCount: 12
    },
    {
      id: 'job-002',
      title: 'Delivery Partner',
      category: 'Delivery',
      location: 'Sherghati, Bihar',
      type: 'Part-time',
      experience: '0-1 years',
      salary: '₹8,000 - ₹12,000/month',
      description: 'Join our delivery team and help us serve fresh momos to our customers.',
      requirements: ['Own bike/cycle', 'Knowledge of local areas'],
      responsibilities: ['Deliver orders on time', 'Maintain food quality during delivery'],
      benefits: ['Flexible hours', 'Performance incentives'],
      isActive: true,
      postedDate: '2025-01-10',
      applicationsCount: 8
    }
  ]);

  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 'app-001',
      jobId: 'job-001',
      fullName: 'Rahul Kumar',
      phone: '9876543210',
      email: 'rahul@example.com',
      city: 'Sherghati',
      position: 'kitchen_staff',
      experience: '1-3',
      expectedSalary: '₹12,000',
      noticePeriod: 'immediate',
      motivation: 'I love cooking and want to learn momos preparation.',
      skills: 'Basic cooking skills, food hygiene knowledge',
      status: 'pending',
      appliedDate: '2025-01-16'
    }
  ]);

  const toggleJobStatus = (jobId: string) => {
    setJobPostings(jobPostings.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ));
  };

  const updateApplicationStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications(applications.map(app =>
      app.id === appId ? { ...app, status: newStatus } : app
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-golden-glow bg-golden-glow/20';
      case 'reviewing': return 'text-blue-400 bg-blue-400/20';
      case 'shortlisted': return 'text-vegetarian-green bg-vegetarian-green/20';
      case 'rejected': return 'text-warm-orange bg-warm-orange/20';
      case 'hired': return 'text-premium-orange bg-premium-orange/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-pitch-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-premium-orange mb-2">
            Career Management
          </h1>
          <p className="text-gray-400">
            Manage job postings and applications
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-premium-orange/20">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 font-bold transition-all duration-300 ${
              activeTab === 'jobs'
                ? 'text-premium-orange border-b-2 border-premium-orange'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Job Postings ({jobPostings.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 font-bold transition-all duration-300 ${
              activeTab === 'applications'
                ? 'text-premium-orange border-b-2 border-premium-orange'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Applications ({applications.length})
          </button>
        </div>

        {/* Job Postings Tab */}
        {activeTab === 'jobs' && (
          <div>
            {/* Action Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4">
                <select className="bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-2 text-white">
                  <option>All Categories</option>
                  <option>Kitchen Staff</option>
                  <option>Delivery</option>
                  <option>Customer Support</option>
                  <option>Management</option>
                </select>
                <select className="bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-2 text-white">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <button
                onClick={() => setIsCreatingJob(true)}
                className="bg-premium-orange text-pitch-black px-6 py-2 rounded-lg font-bold hover:bg-golden-glow transition-all duration-300"
              >
                + Create New Job
              </button>
            </div>

            {/* Job Listings */}
            <div className="grid grid-cols-1 gap-6">
              {jobPostings.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-charcoal rounded-lg p-6 border border-premium-orange/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-golden-glow">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          job.isActive ? 'bg-vegetarian-green/20 text-vegetarian-green' : 'bg-gray-600/20 text-gray-400'
                        }`}>
                          {job.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex gap-4 text-gray-400 text-sm">
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>💰 {job.salary}</span>
                        <span>📅 Posted: {job.postedDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-premium-orange">{job.applicationsCount}</div>
                      <div className="text-gray-400 text-sm">Applications</div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{job.description}</p>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-all">
                      Edit Job
                    </button>
                    <button
                      onClick={() => toggleJobStatus(job.id)}
                      className="px-4 py-2 border-2 border-premium-orange text-premium-orange rounded-lg font-bold hover:bg-premium-orange hover:text-pitch-black transition-all"
                    >
                      {job.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="px-4 py-2 border-2 border-gray-600 text-gray-400 rounded-lg hover:border-gray-400 transition-all">
                      View Applications ({job.applicationsCount})
                    </button>
                    <button className="px-4 py-2 border-2 border-warm-orange text-warm-orange rounded-lg hover:bg-warm-orange hover:text-pitch-black transition-all">
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <select className="bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-2 text-white">
                <option>All Jobs</option>
                {jobPostings.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
              <select className="bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-2 text-white">
                <option>All Status</option>
                <option>Pending</option>
                <option>Reviewing</option>
                <option>Shortlisted</option>
                <option>Rejected</option>
                <option>Hired</option>
              </select>
              <input
                type="text"
                placeholder="Search by name or phone..."
                className="flex-1 bg-charcoal border border-premium-orange/20 rounded-lg px-4 py-2 text-white focus:border-premium-orange focus:outline-none"
              />
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {applications.map((app) => {
                const job = jobPostings.find(j => j.id === app.jobId);
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-charcoal rounded-lg p-6 border border-premium-orange/20"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-golden-glow mb-2">{app.fullName}</h3>
                        <div className="flex gap-4 text-gray-400 text-sm mb-2">
                          <span>📞 {app.phone}</span>
                          <span>📧 {app.email}</span>
                          <span>📍 {app.city}</span>
                        </div>
                        <div className="text-gray-300 text-sm">
                          Applied for: <span className="text-premium-orange font-bold">{job?.title}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(app.status)}`}>
                          {app.status.toUpperCase()}
                        </span>
                        <div className="text-gray-400 text-sm mt-2">
                          Applied: {app.appliedDate}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">Experience:</span>
                        <div className="text-white font-bold">{app.experience} years</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Expected Salary:</span>
                        <div className="text-white font-bold">{app.expectedSalary}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Notice Period:</span>
                        <div className="text-white font-bold">{app.noticePeriod}</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Position:</span>
                        <div className="text-white font-bold">{app.position.replace('_', ' ')}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-gray-400 text-sm mb-1">Motivation:</div>
                      <p className="text-gray-300 text-sm">{app.motivation}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'reviewing')}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-all text-sm"
                      >
                        Mark Reviewing
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                        className="px-4 py-2 bg-vegetarian-green text-pitch-black rounded-lg font-bold hover:bg-green-600 transition-all text-sm"
                      >
                        Shortlist
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'hired')}
                        className="px-4 py-2 bg-premium-orange text-pitch-black rounded-lg font-bold hover:bg-golden-glow transition-all text-sm"
                      >
                        Hire
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'rejected')}
                        className="px-4 py-2 bg-warm-orange text-white rounded-lg font-bold hover:bg-red-600 transition-all text-sm"
                      >
                        Reject
                      </button>
                      <button className="px-4 py-2 border-2 border-premium-orange text-premium-orange rounded-lg font-bold hover:bg-premium-orange hover:text-pitch-black transition-all text-sm">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <div className="text-3xl mb-2">💼</div>
            <div className="text-3xl font-bold text-premium-orange">{jobPostings.length}</div>
            <div className="text-gray-400">Active Jobs</div>
          </div>
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <div className="text-3xl mb-2">📝</div>
            <div className="text-3xl font-bold text-premium-orange">{applications.length}</div>
            <div className="text-gray-400">Total Applications</div>
          </div>
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-3xl font-bold text-vegetarian-green">
              {applications.filter(a => a.status === 'shortlisted').length}
            </div>
            <div className="text-gray-400">Shortlisted</div>
          </div>
          <div className="bg-charcoal rounded-lg p-6 border border-premium-orange/20">
            <div className="text-3xl mb-2">🎉</div>
            <div className="text-3xl font-bold text-golden-glow">
              {applications.filter(a => a.status === 'hired').length}
            </div>
            <div className="text-gray-400">Hired</div>
          </div>
        </div>

        {/* Content Analytics */}
        <div className="mt-8">
          <ContentAnalytics
            contentId="careers-page"
            contentType="page"
            analytics={{
              views: 4800,
              engagement: 58,
              conversions: 95,
              lastUpdated: new Date().toISOString(),
              performance: {
                loadTime: 1.0,
                seoScore: 82,
              },
            }}
          />
        </div>
      </div>

      {/* Visual Design Controls */}
      <VisualDesignPanel pageName="careers" onSave={() => {}} />
    </div>
  );
}
