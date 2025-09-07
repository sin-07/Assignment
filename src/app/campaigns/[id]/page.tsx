"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/Sidebar"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { 
  PanelLeft,
  Eye,
  Users,
  Mail,
  MessageSquare,
  Target,
  Calendar,
  BarChart3,
  TrendingUp,
  Settings,
  ChevronDown,
  Clock,
  ExternalLink,
  Trash2
} from "lucide-react"

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock campaign data - in real app, fetch based on ID
const getCampaignData = (id: string) => {
  const campaigns = {
    "1": {
      name: "Just Herbs",
      status: "Active",
      totalLeads: 20,
      requestSent: 0,
      requestAccepted: 0,
      requestReplied: 0,
      startDate: "02/09/2025",
      conversionRate: 0.0,
      progress: {
        leadsContacted: 0.0,
        acceptanceRate: 0.0,
        replyRate: 0.0
      }
    }
  }
  return campaigns[id as keyof typeof campaigns] || campaigns["1"]
}

// Mock leads data
const getLeadsData = () => [
  {
    id: 1,
    name: "Sumeet Malhotra",
    avatar: "/avatars/sumeet.jpg",
    description: "Don't Stop When you tired Stop when You'...",
    activity: "|||",
    status: "Pending"
  },
  {
    id: 2,
    name: "Megha Sabhlok",
    avatar: "/avatars/megha.jpg",
    description: "Co-founder,Just Herbs ( acquired by Mari...",
    activity: "|||",
    status: "Pending"
  },
  {
    id: 3,
    name: "Archee P.",
    avatar: "/avatars/archee.jpg",
    description: "Content and Marketing Specialist at Just...",
    activity: "|||",
    status: "Pending"
  },
  {
    id: 4,
    name: "Hindustan Herbs",
    avatar: "/avatars/hindustan.jpg",
    description: "Co-Founder at Hindustan Herbs",
    activity: "|||",
    status: "Pending"
  },
  {
    id: 5,
    name: "Ritika Ohri",
    avatar: "/avatars/ritika.jpg",
    description: "Brand Manager: Marketing, Talent and Inn...",
    activity: "|||",
    status: "Pending"
  },
  {
    id: 6,
    name: "Praveen Kumar Gautam",
    avatar: "/avatars/praveen.jpg",
    description: "Vice President - Offline Sales @ Just He...",
    activity: "|||",
    status: "Pending"
  },
  {
    id: 7,
    name: "Shubham Saboo",
    avatar: "/avatars/shubham.jpg",
    description: "Associated as C&F Agent & Superstockiest...",
    activity: "|||",
    status: "Pending"
  }
]

export default function CampaignDetailsPage() {
  const params = useParams()
  const campaignId = params.id as string
  const campaign = getCampaignData(campaignId)
  const leads = getLeadsData()
  const [activeTab, setActiveTab] = useState("Overview")
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const tabs = [
    { id: "Overview", label: "Overview", icon: Eye },
    { id: "Leads", label: "Leads", icon: Users },
    { id: "Sequence", label: "Sequence", icon: Mail },
    { id: "Settings", label: "Settings", icon: Settings }
  ]

  const statCards = [
    {
      title: "Total Leads",
      value: campaign.totalLeads,
      icon: Users,
      iconColor: "text-blue-500"
    },
    {
      title: "Request Sent",
      value: campaign.requestSent,
      icon: Mail,
      iconColor: "text-purple-500"
    },
    {
      title: "Request Accepted",
      value: campaign.requestAccepted,
      icon: MessageSquare,
      iconColor: "text-green-500"
    },
    {
      title: "Request Replied",
      value: campaign.requestReplied,
      icon: Target,
      iconColor: "text-indigo-500"
    }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden mr-4 mt-4 mb-4">
        {/* Header */}
        <div className="bg-white px-6 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <PanelLeft className="w-5 h-5 text-gray-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{campaign.name}</h1>
                <p className="text-sm text-gray-600">Campaign Details</p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
              {campaign.status}
            </Badge>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-b-lg shadow-md border border-gray-200">
          {/* Tabs */}
          <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
            </div>

          {/* Content */}
          <div className="flex-1 overflow-auto min-h-0 scrollbar-hide p-4">
          {activeTab === "Overview" && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {statCards.map((stat, index) => (
                  <Card key={index} className="p-4 bg-white border border-gray-200 shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-50`}>
                        <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Campaign Progress */}
                <div className="lg:col-span-2">
                  <Card className="p-4 bg-white border border-gray-200 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Progress</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Leads Contacted</span>
                          <span className="text-sm text-gray-500">{campaign.progress.leadsContacted}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${campaign.progress.leadsContacted}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Acceptance Rate</span>
                          <span className="text-sm text-gray-500">{campaign.progress.acceptanceRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${campaign.progress.acceptanceRate}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Reply Rate</span>
                          <span className="text-sm text-gray-500">{campaign.progress.replyRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${campaign.progress.replyRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Campaign Details Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="p-4 bg-white border border-gray-200 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Start Date:</p>
                          <p className="text-sm font-medium text-gray-900">{campaign.startDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Status:</p>
                          <p className="text-sm font-medium text-gray-900">{campaign.status}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Conversion Rate:</p>
                          <p className="text-sm font-medium text-gray-900">{campaign.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}

          {activeTab === "Leads" && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-md">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span>Name</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Lead Description</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">Activity</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <span>Status</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow 
                      key={lead.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedLead(lead)
                        setIsProfileOpen(true)
                      }}
                    >
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={lead.avatar} alt={lead.name} />
                            <AvatarFallback className="bg-gray-200 text-gray-600">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-gray-900">{lead.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-gray-600">{lead.description}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center space-x-1">
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {lead.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === "Sequence" && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-md">
              {/* Header */}
              <div className="border-b border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Message Sequence</h2>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Left Column - Request Message */}
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-gray-900">Request Message</h3>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Save
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Edit your request message here.</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-4">Available fields:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <code className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-mono">
                            {"{fullName}"}
                          </code>
                          <span className="ml-3 text-gray-600">- Full Name</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <code className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-mono">
                            {"{firstName}"}
                          </code>
                          <span className="ml-3 text-gray-600">- First Name</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <code className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-mono">
                            {"{lastName}"}
                          </code>
                          <span className="ml-3 text-gray-600">- Last Name</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <code className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-mono">
                            {"{jobTitle}"}
                          </code>
                          <span className="ml-3 text-gray-600">- Job Title</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Message Template */}
                  <div>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Message Template</h3>
                      <p className="text-sm text-gray-600">Design your message template using the available fields</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center mb-4 text-sm text-gray-600">
                        <div className="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center mr-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                        <span>Use {"{field_name}"} to insert mapped fields from your Data.</span>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[200px] relative">
                        <div className="text-gray-700 text-sm leading-relaxed">
                          <p>Hi {"{firstName}"}, just following up on my message. Just try it for 1 week. No cost. If it doesn't deliver results, you can remove it.</p>
                        </div>
                        
                        <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                          0/220 characters
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Sequence Flow */}
                <div className="space-y-6">
                  {/* Connection Message */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Connection Message</h3>
                        <p className="text-sm text-gray-600">Edit your connection message here.</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Save
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[100px] text-sm text-gray-700">
                      Awesome to connect, <code className="bg-orange-100 text-orange-700 px-1 rounded">{"{firstName}"}</code>! Allow me to explain Kandid a bit: So these are consultative salespersons that engage with visitors like an offline store salesperson does. It helps them with product recommendations based on their preferences/concerns. Here's a video to help you visualise it better: https://youtu.be/J31XNvj-vPo
                    </div>
                  </div>

                  {/* First Follow-up Message */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">First Follow-up Message</h3>
                        <p className="text-sm text-gray-600">Edit your first follow-up message here.</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Save
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[100px] text-sm text-gray-700 mb-4">
                      you like to explore a POC for Just Herbs?
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Send</span>
                      </div>
                      <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                        <option>1 day</option>
                        <option>2 days</option>
                        <option>3 days</option>
                        <option>1 week</option>
                      </select>
                      <span>After Welcome Message</span>
                    </div>
                  </div>

                  {/* Second Follow-up Message */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Second Follow-up Message</h3>
                        <p className="text-sm text-gray-600">Edit your second follow-up message here.</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Save
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 min-h-[100px] text-sm text-gray-700 mb-4">
                      Hi <code className="bg-orange-100 text-orange-700 px-1 rounded">{"{firstName}"}</code>, just following up on my message. Just try it for 1 week. No cost. If it doesn't deliver results, you can remove it.
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Send</span>
                      </div>
                      <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                        <option>1 day</option>
                        <option>2 days</option>
                        <option>3 days</option>
                        <option>1 week</option>
                      </select>
                      <span>After First Follow-up</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-md">
              {/* Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Campaign Settings</h2>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save All Changes
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Campaign Details Section */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-6">Campaign Details</h3>
                  
                  <div className="space-y-6">
                    {/* Campaign Name */}
                    <div>
                      <Label htmlFor="campaignName" className="text-sm font-medium text-gray-700 mb-2 block">
                        Campaign Name
                      </Label>
                      <Input
                        id="campaignName"
                        defaultValue="Just Herbs"
                        className="w-full max-w-md"
                      />
                    </div>

                    {/* Campaign Status Toggle */}
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Campaign Status</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    {/* Request without personalization Toggle */}
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Request without personalization</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                {/* AutoPilot Mode Section */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">AutoPilot Mode</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Let the system automatically manage LinkedIn account assignments
                      </p>
                    </div>
                    <Switch />
                  </div>

                  {/* Account Selection */}
                  <div className="mt-6">
                    <Select defaultValue="1-account">
                      <SelectTrigger className="w-full max-w-md">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-account">1 account selected</SelectItem>
                        <SelectItem value="2-accounts">2 accounts selected</SelectItem>
                        <SelectItem value="3-accounts">3 accounts selected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Selected Accounts */}
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700 mb-3">Selected Accounts:</p>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/api/placeholder/32/32" alt="Jivosh Lakhani" />
                        <AvatarFallback className="bg-blue-100 text-blue-600">JL</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-900">Jivosh Lakhani</span>
                    </div>
                  </div>
                </div>

                {/* Danger Zone Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-600 mb-6">Irreversible and destructive actions</p>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">Delete Campaign</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Permanently delete this campaign and all associated data
                        </p>
                      </div>
                      <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                        Delete Campaign
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead Profile Sheet */}
      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          {selectedLead && (
            <>
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle>Lead Profile</SheetTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6">
                {/* Lead Header */}
                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedLead.avatar} alt={selectedLead.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                        {selectedLead.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{selectedLead.name}</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{selectedLead.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <MessageSquare className="w-3 h-3" />
                          <span>Just Herbs</span>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          <Clock className="w-3 h-3 mr-1" />
                          {selectedLead.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
                  
                  <div className="space-y-6">
                    {/* Invitation Request */}
                    <div className="flex space-x-3 relative">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center relative z-10">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Invitation Request</h4>
                        <p className="text-sm text-gray-600">
                          Message: Hi Sumeet, I'm building consultative...{" "}
                          <button className="text-blue-600 hover:text-blue-700 text-sm">See More</button>
                        </p>
                      </div>
                    </div>

                    {/* Connection Status */}
                    <div className="flex space-x-3 relative">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center relative z-10">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Connection Status</h4>
                        <p className="text-sm text-gray-600">Check connection status</p>
                      </div>
                    </div>

                    {/* Connection Acceptance Message */}
                    <div className="flex space-x-3 relative">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center relative z-10">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Connection Acceptance Message</h4>
                        <p className="text-sm text-gray-600">
                          Message: Awesome to connect, Sumeet! Allow me...{" "}
                          <button className="text-blue-600 hover:text-blue-700 text-sm">See More</button>
                        </p>
                      </div>
                    </div>

                    {/* Follow-up 1 */}
                    <div className="flex space-x-3 relative">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center relative z-10">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Follow-up 1</h4>
                        <p className="text-sm text-gray-600">
                          Message: Hey, did you get a chance to go thro...{" "}
                          <button className="text-blue-600 hover:text-blue-700 text-sm">See More</button>
                        </p>
                      </div>
                    </div>

                    {/* Follow-up 2 */}
                    <div className="flex space-x-3 relative">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center relative z-10">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Follow-up 2</h4>
                        <p className="text-sm text-gray-600">
                          Message: Hi Sumeet, just following up on my m...{" "}
                          <button className="text-blue-600 hover:text-blue-700 text-sm">See More</button>
                        </p>
                      </div>
                    </div>

                    {/* Replied */}
                    <div className="flex space-x-3 relative">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center relative z-10">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Replied</h4>
                        <p className="text-sm text-gray-600">No reply from lead</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
      </div>
    </div>
  )
}
