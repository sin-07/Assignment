"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Sidebar from "@/components/Sidebar"
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  MessageSquare, 
  Linkedin, 
  Settings, 
  Activity,
  UserCircle,
  MoreHorizontal,
  Search,
  Plus,
  Check,
  Clock,
  X,
  Link as LinkIcon,
  FileText,
  User,
  MessageCircle,
  Folder,
  PanelLeft,
  CirclePlus
} from "lucide-react"

// Mock data for campaigns
const generateCampaignData = (startId: number, count: number) => {
  const campaignNames = [
    "Just Herbs", "Juicy Chemistry", "Hyugalife", "Honeyveda", "HempStreet", 
    "HealthyHey", "Herbal Chakra", "Healofy", "HealthSense", "Nature's Bliss",
    "Organic Essentials", "Pure Wellness", "Green Therapy", "Vital Nutrients",
    "Bio Natural", "Earth Elements", "Fresh & Pure", "Natural Glow",
    "Ayur Remedies", "Herbal Magic", "Botanical Care", "Wellness Plus",
    "Nature Care", "Pure Herbs", "Organic Life", "Natural Remedies",
    "Green Health", "Bio Wellness", "Pure Nature", "Herbal Solutions"
  ];
  
  const statuses = ["Active", "Inactive", "Draft"];
  
  return Array.from({ length: count }, (_, index) => {
    const id = startId + index;
    // Use a deterministic approach based on id to avoid hydration issues
    const nameIndex = id % campaignNames.length;
    const statusIndex = id % statuses.length;
    const randomName = campaignNames[nameIndex];
    const randomStatus = statuses[statusIndex];
    const totalLeads = (id * 7) % 50 + 1; // Deterministic based on id
    const accepted = Math.floor(totalLeads * 0.3);
    const rejected = Math.floor(totalLeads * 0.2);
    const pending = totalLeads - accepted - rejected;
    const connected = Math.floor(accepted * 0.8);
    const pendingConnection = accepted - connected;
    
    return {
      id,
      name: `${randomName} ${id > 30 ? Math.floor(id / 10) : ''}`.trim(),
      status: randomStatus,
      totalLeads,
      requestStatus: { accepted, pending, rejected },
      connectionStatus: { connected, pending: pendingConnection }
    };
  });
};

const initialCampaignsData = generateCampaignData(1, 30);

// Status indicator component
const StatusIndicator = ({ accepted, pending, rejected }: { accepted: number, pending: number, rejected: number }) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Accepted */}
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-900">{accepted}</span>
      </div>
      
      {/* Pending */}
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
          <Clock className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-900">{pending}</span>
      </div>
      
      {/* Rejected */}
      <div className="flex items-center space-x-1">
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <X className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-900">{rejected}</span>
      </div>
    </div>
  )
}

// Connection status component
const ConnectionStatus = ({ connected, pending }: { connected: number, pending: number }) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Connected */}
      <div className="flex items-center space-x-1">
        <User className="w-4 h-4 text-blue-500" />
        <span className="text-sm font-medium text-gray-900">{connected}</span>
      </div>
      
      {/* Pending */}
      <div className="flex items-center space-x-1">
        <MessageCircle className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-medium text-gray-900">{pending}</span>
      </div>
    </div>
  )
}

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("All Campaigns")
  const [campaigns, setCampaigns] = useState(initialCampaignsData)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const router = useRouter()

  const loadMoreCampaigns = () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const newCampaigns = generateCampaignData(campaigns.length + 1, 10)
      setCampaigns(prev => [...prev, ...newCampaigns])
      setLoading(false)
      
      // Stop loading more after 100 campaigns for demo
      if (campaigns.length >= 100) {
        setHasMore(false)
      }
    }, 500)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
    
    // Load more when user scrolls to within 100px of bottom
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadMoreCampaigns()
    }
  }

  const handleCampaignClick = (campaignId: number) => {
    router.push(`/campaigns/${campaignId}`)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden mr-4 mt-4 mb-4">
        {/* Header */}
        <div className="bg-white px-6 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <PanelLeft className="w-5 h-5 text-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900">Campaign</h1>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              <CirclePlus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-b-lg shadow-md border border-gray-200">
          {/* Tabs and Search */}
          <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                {["All Campaigns", "Active", "Inactive"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 border-b-2 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto min-h-0 scrollbar-hide" onScroll={handleScroll}>
            <Table>
              <TableHeader className="sticky top-0 bg-gray-50 z-10">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-3 px-4">Campaign Name</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 px-4">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 px-4">Total Leads</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 px-4">Request Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-3 px-4">Connection Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow 
                    key={campaign.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleCampaignClick(campaign.id)}
                  >
                    <TableCell className="py-3 px-4">
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 rounded-md text-green-700 border-green-200"
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{campaign.totalLeads}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <StatusIndicator 
                        accepted={campaign.requestStatus.accepted}
                        pending={campaign.requestStatus.pending}
                        rejected={campaign.requestStatus.rejected}
                      />
                    </TableCell>
                    <TableCell className="py-3 px-4">
                      <ConnectionStatus 
                        connected={campaign.connectionStatus.connected}
                        pending={campaign.connectionStatus.pending}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-600">Loading more campaigns...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {!hasMore && campaigns.length > 20 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                      No more campaigns to load
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
